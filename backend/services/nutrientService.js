import { getBaseNutrients } from "../utils/foodDatabase.js";

/** Rounds to one decimal place to keep nutrient numbers tidy. */
const round = (n) => Math.round(n * 10) / 10;

/**
 * Nutrient Scaling Algorithm (server-side source of truth).
 *
 * Scales a food's per-100g base nutrients to the requested portion:
 *   actualValue = (portionInGrams / 100) * baseNutrient
 *
 * @param {string} foodName - must exist in the food database
 * @param {number} portion  - portion weight in grams (> 0)
 * @returns {{calories:number, protein:number, carbs:number, fat:number}}
 * @throws {Error} with .statusCode for invalid input / unknown food
 */
export const calculateNutrients = (foodName, portion) => {
  const portionNum = Number(portion);

  if (!Number.isFinite(portionNum) || portionNum <= 0) {
    const err = new Error("Portion must be a positive number (grams).");
    err.statusCode = 400;
    throw err;
  }

  const base = getBaseNutrients(foodName);
  if (!base) {
    const err = new Error(
      `Unknown food "${foodName}". Supported foods: Chicken Breast, Rice, Egg, Banana, Oats.`
    );
    err.statusCode = 400;
    throw err;
  }

  const factor = portionNum / 100;

  return {
    calories: round(base.calories * factor),
    protein: round(base.protein * factor),
    carbs: round(base.carbs * factor),
    fat: round(base.fat * factor),
  };
};
