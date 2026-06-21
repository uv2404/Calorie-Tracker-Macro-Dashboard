import axios from "axios";

/**
 * Single shared Axios instance. Base URL comes from VITE_API_BASE_URL and
 * defaults to "/api" (served via the Vite dev proxy).
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

/**
 * Normalizes backend errors into a single Error with a readable message so
 * React Query / toasts can display something useful.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

export default api;
