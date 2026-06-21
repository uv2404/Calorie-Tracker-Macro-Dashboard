import mongoose from "mongoose";
import { VALID_GOALS } from "../utils/goalTargets.js";

/**
 * The user's currently selected fitness goal and its target thresholds.
 * This prototype is single-user, so we keep exactly one Goal document
 * (a singleton) that gets updated in place when the goal changes.
 */
const goalSchema = new mongoose.Schema(
  {
    goal: {
      type: String,
      enum: VALID_GOALS,
      required: true,
    },
    calorieTarget: { type: Number, required: true },
    proteinTarget: { type: Number, required: true },
    carbTarget: { type: Number, required: true },
    fatTarget: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Goal", goalSchema);
