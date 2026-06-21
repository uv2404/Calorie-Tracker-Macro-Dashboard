import Meal from "../models/Meal.js";
import { getOrCreateGoal } from "./goalService.js";

/** Percentage of a total against a target, rounded, capped is NOT applied here
 *  (frontend caps the bar width; we expose the true value so >100% is visible). */
const percent = (total, target) =>
  target > 0 ? Math.round((total / target) * 100) : 0;

const round = (n) => Math.round(n * 10) / 10;

/**
 * Computes the daily dashboard payload: aggregate macro totals, percentages
 * against the active goal's targets, remaining calories, and the exceeded flag
 * that drives the red warning state on the frontend.
 *
 * This is the validation/aggregation logic the spec requires to live on the server.
 */
export const buildDashboard = async () => {
  const [goal, meals] = await Promise.all([getOrCreateGoal(), Meal.find()]);

  const totals = meals.reduce(
    (acc, m) => {
      acc.totalCalories += m.calories;
      acc.totalProtein += m.protein;
      acc.totalCarbs += m.carbs;
      acc.totalFat += m.fat;
      return acc;
    },
    { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 }
  );

  const totalCalories = round(totals.totalCalories);
  const exceeded = totalCalories > goal.calorieTarget;

  return {
    totalCalories,
    totalProtein: round(totals.totalProtein),
    totalCarbs: round(totals.totalCarbs),
    totalFat: round(totals.totalFat),
    caloriePercentage: percent(totals.totalCalories, goal.calorieTarget),
    proteinPercentage: percent(totals.totalProtein, goal.proteinTarget),
    carbPercentage: percent(totals.totalCarbs, goal.carbTarget),
    fatPercentage: percent(totals.totalFat, goal.fatTarget),
    remainingCalories: round(goal.calorieTarget - totals.totalCalories),
    exceeded,
    // Targets are included so the UI can render "1840 / 2200 kcal" style labels.
    targets: {
      calorieTarget: goal.calorieTarget,
      proteinTarget: goal.proteinTarget,
      carbTarget: goal.carbTarget,
      fatTarget: goal.fatTarget,
    },
    goal: goal.goal,
  };
};
