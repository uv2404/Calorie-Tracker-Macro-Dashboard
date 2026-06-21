import { describe, it, expect } from "vitest";
import { calculateNutrients } from "../services/nutrientService.js";

/**
 * Pure unit tests for the Nutrient Scaling Algorithm — no database needed.
 * Formula under test:  actualValue = (portion / 100) * baseNutrient
 */
describe("nutrientService.calculateNutrients", () => {
  it("returns the per-100g base values for a 100g portion", () => {
    // Chicken Breast base: 165 / 31 / 0 / 3.6
    expect(calculateNutrients("Chicken Breast", 100)).toEqual({
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
    });
  });

  it("scales linearly with portion size (200g = 2x base)", () => {
    expect(calculateNutrients("Chicken Breast", 200)).toEqual({
      calories: 330,
      protein: 62,
      carbs: 0,
      fat: 7.2,
    });
  });

  it("handles fractional portions and rounds to one decimal", () => {
    // Oats base: 389 / 17 / 66 / 7  at 50g -> half
    expect(calculateNutrients("Oats", 50)).toEqual({
      calories: 194.5,
      protein: 8.5,
      carbs: 33,
      fat: 3.5,
    });
  });

  it("is case-insensitive and trims whitespace on the food name", () => {
    expect(calculateNutrients("  rICe  ", 100)).toEqual({
      calories: 130,
      protein: 2.7,
      carbs: 28,
      fat: 0.3,
    });
  });

  it("rejects an unknown food with a 400 error", () => {
    try {
      calculateNutrients("Pizza", 100);
      throw new Error("should have thrown");
    } catch (err) {
      expect(err.statusCode).toBe(400);
      expect(err.message).toMatch(/unknown food/i);
    }
  });

  it.each([0, -50, NaN, "abc", undefined])(
    "rejects an invalid portion (%s) with a 400 error",
    (portion) => {
      try {
        calculateNutrients("Rice", portion);
        throw new Error("should have thrown");
      } catch (err) {
        expect(err.statusCode).toBe(400);
        expect(err.message).toMatch(/portion/i);
      }
    }
  );
});
