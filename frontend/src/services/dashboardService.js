import api from "./api.js";

/** Fetch aggregate totals, percentages, remaining calories and exceeded flag. */
export const fetchDashboard = async () => {
  const { data } = await api.get("/dashboard");
  return data;
};
