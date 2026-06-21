import api from "./api.js";

/** Fetch the current fitness goal and its targets. */
export const fetchGoal = async () => {
  const { data } = await api.get("/goals");
  return data;
};

/** Change the active fitness goal (weight-loss | maintenance | muscle-gain). */
export const updateGoal = async (goal) => {
  const { data } = await api.put("/goals", { goal });
  return data;
};
