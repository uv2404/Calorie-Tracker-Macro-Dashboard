import Goal from "../models/Goal.js";
import { GOAL_TARGETS, DEFAULT_GOAL, VALID_GOALS } from "../utils/goalTargets.js";

/**
 * Returns the singleton Goal document, creating it with the default goal
 * (Maintenance) on first run. This guarantees the dashboard always has
 * targets to compute percentages against.
 */
export const getOrCreateGoal = async () => {
  let goal = await Goal.findOne();
  if (!goal) {
    goal = await Goal.create(GOAL_TARGETS[DEFAULT_GOAL]);
  }
  return goal;
};

/**
 * Updates the active fitness goal. We overwrite the target thresholds from
 * the canonical GOAL_TARGETS table rather than trusting client input, so the
 * server stays the single source of truth.
 *
 * @param {string} goalKey - one of weight-loss | maintenance | muscle-gain
 * @throws {Error} with .statusCode for an invalid goal key
 */
export const updateGoal = async (goalKey) => {
  if (!VALID_GOALS.includes(goalKey)) {
    const err = new Error(
      `Invalid goal "${goalKey}". Must be one of: ${VALID_GOALS.join(", ")}.`
    );
    err.statusCode = 400;
    throw err;
  }

  const targets = GOAL_TARGETS[goalKey];
  // Upsert the singleton so the existing meal history is never touched.
  const goal = await Goal.findOneAndUpdate({}, targets, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });

  return goal;
};
