/**
 * Fixed daily target thresholds for each fitness goal.
 * Changing the active goal swaps these targets, which instantly changes
 * progress-bar percentages and the over-budget (red warning) trigger.
 */
export const GOAL_TARGETS = {
  "weight-loss": {
    goal: "weight-loss",
    calorieTarget: 1800,
    proteinTarget: 140,
    carbTarget: 180,
    fatTarget: 50,
  },
  maintenance: {
    goal: "maintenance",
    calorieTarget: 2200,
    proteinTarget: 150,
    carbTarget: 250,
    fatTarget: 70,
  },
  "muscle-gain": {
    goal: "muscle-gain",
    calorieTarget: 2800,
    proteinTarget: 180,
    carbTarget: 320,
    fatTarget: 90,
  },
};

export const DEFAULT_GOAL = "maintenance";

export const VALID_GOALS = Object.keys(GOAL_TARGETS);
