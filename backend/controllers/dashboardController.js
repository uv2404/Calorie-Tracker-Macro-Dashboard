import { buildDashboard } from "../services/dashboardService.js";

/**
 * GET /api/dashboard
 * Returns aggregate macro totals, percentages, remaining calories and the
 * exceeded flag — everything the frontend needs to render the bars and warning.
 */
export const getDashboard = async (req, res, next) => {
  try {
    const dashboard = await buildDashboard();
    res.json(dashboard);
  } catch (err) {
    next(err);
  }
};
