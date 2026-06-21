/** Fitness goal options for the toggle (label + value sent to the API). */
export const GOAL_OPTIONS = [
  { value: "weight-loss", label: "Weight Loss" },
  { value: "maintenance", label: "Maintenance" },
  { value: "muscle-gain", label: "Muscle Gain" },
];

/**
 * Simulated AI image-scan result. The portion/name are auto-filled into the
 * form; the backend still computes the real nutrients from these inputs.
 */
export const MOCK_SCAN = { foodName: "Rice", portion: 200 };

/** Foods the backend knows about — shown as quick-pick hints in the form. */
export const SUPPORTED_FOODS = ["Chicken Breast", "Rice", "Egg", "Banana", "Oats"];
