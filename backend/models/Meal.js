import mongoose from "mongoose";

/**
 * A single logged meal. Nutrient values are stored pre-computed (calculated
 * server-side at creation time) so dashboard aggregation is a simple sum.
 */
const mealSchema = new mongoose.Schema(
  {
    foodName: { type: String, required: true, trim: true },
    portion: { type: Number, required: true, min: 0 }, // grams
    calories: { type: Number, required: true, min: 0 },
    protein: { type: Number, required: true, min: 0 },
    carbs: { type: Number, required: true, min: 0 },
    fat: { type: Number, required: true, min: 0 },
  },
  {
    // Adds createdAt (used as the meal timestamp) and updatedAt automatically.
    timestamps: true,
  }
);

export default mongoose.model("Meal", mealSchema);
