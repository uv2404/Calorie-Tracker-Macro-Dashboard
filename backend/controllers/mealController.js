import Meal from "../models/Meal.js";
import { calculateNutrients } from "../services/nutrientService.js";

/**
 * POST /api/meals
 * Adds a meal. The client sends only { foodName, portion }; the server
 * calculates all nutrients so the frontend never computes values itself.
 */
export const addMeal = async (req, res, next) => {
  try {
    const { foodName, portion } = req.body;

    if (!foodName || portion === undefined) {
      return res
        .status(400)
        .json({ message: "foodName and portion are required." });
    }

    // Throws (400) for unknown food or invalid portion.
    const nutrients = calculateNutrients(foodName, portion);

    const meal = await Meal.create({
      foodName: foodName.trim(),
      portion: Number(portion),
      ...nutrients,
    });

    res.status(201).json(meal);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/meals
 * Returns all logged meals, newest first.
 */
export const getMeals = async (req, res, next) => {
  try {
    const meals = await Meal.find().sort({ createdAt: -1 });
    res.json(meals);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/meals/:id
 * Removes a meal. Totals are recomputed on the next dashboard fetch.
 */
export const deleteMeal = async (req, res, next) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found." });
    }
    res.json({ message: "Meal deleted.", id: req.params.id });
  } catch (err) {
    next(err);
  }
};
