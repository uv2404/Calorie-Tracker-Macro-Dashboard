/**
 * Predefined food database.
 * All values are per 100g (the "base baseline"). The nutrient scaling
 * algorithm scales these relative to the user-supplied portion.
 *
 * Keys are normalized to lowercase for case-insensitive lookup.
 */
export const FOOD_DATABASE = {
  "chicken breast": { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  rice: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  egg: { calories: 155, protein: 13, carbs: 1, fat: 11 },
  banana: { calories: 89, protein: 1, carbs: 23, fat: 0.3 },
  oats: { calories: 389, protein: 17, carbs: 66, fat: 7 },
};

/**
 * Mock value returned when the "Image Upload" (simulated AI scanner) is used.
 * The frontend auto-fills these inputs; the backend still recalculates the
 * actual nutrients from the portion to keep a single source of truth.
 */
export const MOCK_SCAN_RESULT = {
  foodName: "Rice",
  portion: 200,
};

/**
 * Looks up a food's per-100g nutrient profile.
 * @param {string} foodName
 * @returns {{calories:number, protein:number, carbs:number, fat:number} | null}
 */
export const getBaseNutrients = (foodName) => {
  if (!foodName) return null;
  const key = foodName.trim().toLowerCase();
  return FOOD_DATABASE[key] || null;
};

/** List of supported food names (original casing) for the frontend dropdown / hints. */
export const SUPPORTED_FOODS = ["Chicken Breast", "Rice", "Egg", "Banana", "Oats"];
