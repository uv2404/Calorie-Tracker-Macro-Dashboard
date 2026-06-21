import api from "./api.js";

/** Fetch all logged meals (newest first). */
export const fetchMeals = async () => {
  const { data } = await api.get("/meals");
  return data;
};

/** Add a meal. Server calculates nutrients from { foodName, portion }. */
export const createMeal = async ({ foodName, portion }) => {
  const { data } = await api.post("/meals", { foodName, portion });
  return data;
};

/** Delete a meal by id. */
export const deleteMeal = async (id) => {
  const { data } = await api.delete(`/meals/${id}`);
  return data;
};
