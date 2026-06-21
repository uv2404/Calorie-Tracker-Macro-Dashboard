import { useQuery } from "@tanstack/react-query";
import { fetchDashboard } from "../services/dashboardService.js";
import { queryKeys } from "../utils/queryKeys.js";

/** Read the computed dashboard payload (totals, percentages, exceeded flag). */
export const useDashboard = () =>
  useQuery({ queryKey: queryKeys.dashboard, queryFn: fetchDashboard });
