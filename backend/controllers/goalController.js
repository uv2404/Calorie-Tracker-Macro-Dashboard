import { getOrCreateGoal, updateGoal } from "../services/goalService.js";

/**
 * GET /api/goals
 * Returns the current fitness goal and its target thresholds.
 */
export const getGoal = async (req, res, next) => {
  try {
    const goal = await getOrCreateGoal();
    res.json(goal);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/goals
 * Switches the active fitness goal. Meal history is preserved; only the
 * target thresholds change, which the dashboard endpoint reflects immediately.
 */
export const changeGoal = async (req, res, next) => {
  try {
    const { goal } = req.body;
    if (!goal) {
      return res.status(400).json({ message: "goal is required." });
    }
    const updated = await updateGoal(goal); // throws 400 if invalid
    res.json(updated);
  } catch (err) {
    next(err);
  }
};
