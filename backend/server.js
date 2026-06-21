import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import { SUPPORTED_FOODS } from "./utils/foodDatabase.js";

import mealRoutes from "./routes/mealRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

// Connect to MongoDB before serving requests.
await connectDB();

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
