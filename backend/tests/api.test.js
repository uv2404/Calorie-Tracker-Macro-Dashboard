import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import request from "supertest";

import app from "../app.js";
import { connectTestDb, clearTestDb, closeTestDb } from "./helpers/testDb.js";

// Shared in-memory DB lifecycle for the whole API suite.
beforeAll(connectTestDb);
afterEach(clearTestDb);
afterAll(closeTestDb);

describe("GET /api/health", () => {
  it("reports ok and the supported foods", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.supportedFoods).toContain("Chicken Breast");
  });
});

describe("Goals API", () => {
  it("defaults to the maintenance goal on first read", async () => {
    const res = await request(app).get("/api/goals");
    expect(res.status).toBe(200);
    expect(res.body.goal).toBe("maintenance");
    expect(res.body.calorieTarget).toBe(2200);
  });

  it("changes the goal and swaps the target thresholds", async () => {
    const res = await request(app).put("/api/goals").send({ goal: "muscle-gain" });
    expect(res.status).toBe(200);
    expect(res.body.goal).toBe("muscle-gain");
    expect(res.body.calorieTarget).toBe(2800);
    expect(res.body.proteinTarget).toBe(180);
  });

  it("rejects an invalid goal with 400", async () => {
    const res = await request(app).put("/api/goals").send({ goal: "bulk" });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/invalid goal/i);
  });
});

describe("Meals API", () => {
  it("computes nutrients server-side when adding a meal", async () => {
    const res = await request(app)
      .post("/api/meals")
      .send({ foodName: "Chicken Breast", portion: 200 });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      foodName: "Chicken Breast",
      portion: 200,
      calories: 330,
      protein: 62,
      carbs: 0,
      fat: 7.2,
    });
    expect(res.body._id).toBeDefined();
  });

  it("ignores any nutrient values sent by the client (server is source of truth)", async () => {
    const res = await request(app)
      .post("/api/meals")
      .send({ foodName: "Rice", portion: 100, calories: 99999, protein: 999 });

    expect(res.status).toBe(201);
    expect(res.body.calories).toBe(130); // recomputed, not the bogus 99999
    expect(res.body.protein).toBe(2.7);
  });

  it("rejects an unknown food with 400", async () => {
    const res = await request(app)
      .post("/api/meals")
      .send({ foodName: "Pizza", portion: 100 });
    expect(res.status).toBe(400);
  });

  it("lists meals newest-first and deletes by id", async () => {
    await request(app).post("/api/meals").send({ foodName: "Egg", portion: 100 });
    const second = await request(app)
      .post("/api/meals")
      .send({ foodName: "Banana", portion: 100 });

    const list = await request(app).get("/api/meals");
    expect(list.body).toHaveLength(2);
    expect(list.body[0].foodName).toBe("Banana"); // newest first

    const del = await request(app).delete(`/api/meals/${second.body._id}`);
    expect(del.status).toBe(200);

    const after = await request(app).get("/api/meals");
    expect(after.body).toHaveLength(1);
    expect(after.body[0].foodName).toBe("Egg");
  });

  it("returns 404 when deleting a non-existent meal", async () => {
    const res = await request(app).delete("/api/meals/64b2f0000000000000000000");
    expect(res.status).toBe(404);
  });

  it("returns 400 for a malformed meal id", async () => {
    const res = await request(app).delete("/api/meals/not-an-id");
    expect(res.status).toBe(400);
  });
});

describe("Dashboard API", () => {
  it("aggregates totals and percentages against the active goal", async () => {
    // Chicken 200g (330 kcal) + Oats 150g (583.5 kcal) = 913.5 kcal
    await request(app).post("/api/meals").send({ foodName: "Chicken Breast", portion: 200 });
    await request(app).post("/api/meals").send({ foodName: "Oats", portion: 150 });

    const res = await request(app).get("/api/dashboard");
    expect(res.status).toBe(200);
    expect(res.body.totalCalories).toBe(913.5);
    expect(res.body.caloriePercentage).toBe(42); // 913.5 / 2200
    expect(res.body.remainingCalories).toBe(1286.5);
    expect(res.body.exceeded).toBe(false);
  });

  it("flags exceeded=true once the calorie target is crossed", async () => {
    await request(app).put("/api/goals").send({ goal: "weight-loss" }); // target 1800
    // Oats 500g -> 1945 kcal > 1800
    await request(app).post("/api/meals").send({ foodName: "Oats", portion: 500 });

    const res = await request(app).get("/api/dashboard");
    expect(res.body.exceeded).toBe(true);
    expect(res.body.caloriePercentage).toBeGreaterThan(100);
    expect(res.body.remainingCalories).toBeLessThan(0);
  });

  it("recalculates percentages on goal change WITHOUT wiping meal history", async () => {
    await request(app).post("/api/meals").send({ foodName: "Chicken Breast", portion: 200 });

    const before = await request(app).get("/api/dashboard"); // maintenance 2200
    expect(before.body.caloriePercentage).toBe(15); // 330 / 2200

    await request(app).put("/api/goals").send({ goal: "weight-loss" }); // 1800

    const meals = await request(app).get("/api/meals");
    expect(meals.body).toHaveLength(1); // history preserved

    const after = await request(app).get("/api/dashboard");
    expect(after.body.totalCalories).toBe(330); // same meals
    expect(after.body.caloriePercentage).toBe(18); // 330 / 1800 -> recalculated
  });
});
