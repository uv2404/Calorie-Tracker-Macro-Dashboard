import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchGoal, updateGoal } from "../services/goalService.js";
import { queryKeys } from "../utils/queryKeys.js";

/** Read the current fitness goal + targets. */
export const useGoal = () =>
  useQuery({ queryKey: queryKeys.goal, queryFn: fetchGoal });

/**
 * Change the fitness goal. Invalidates the goal AND dashboard caches so the
 * progress bars and warning thresholds recalculate instantly — meal history
 * (the `meals` cache) is intentionally left untouched.
 */
export const useUpdateGoal = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateGoal,
    onSuccess: (goal) => {
      qc.invalidateQueries({ queryKey: queryKeys.goal });
      qc.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success(`Goal set to ${goal.goal.replace("-", " ")}`);
    },
    onError: (err) => toast.error(err.message),
  });
};
