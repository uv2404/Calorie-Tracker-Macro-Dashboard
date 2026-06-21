import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { notFound, errorHandler } from "./middleware/errorHandler.js";
import { SUPPORTED_FOODS } from "./utils/foodDatabase.js";

import mealRoutes from "./routes/mealRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

// Load env when the app module is imported (covers both server boot and tests).
dotenv.config();

/**
 * Builds and returns the configured Express app WITHOUT connecting to the
 * database or starting a listener. Keeping these concerns out of this module
 * lets tests import `app` and drive it with Supertest against an in-memory DB.
 */
const app = express();

// --- Global middleware ---
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(express.json());

// --- Health check / supported foods (handy for the frontend hints) ---
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", supportedFoods: SUPPORTED_FOODS });
});

// --- Feature routes ---
app.use("/api/meals", mealRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/dashboard", dashboardRoutes);

// --- Error handling (must be last) ---
app.use(notFound);
app.use(errorHandler);

export default app;
