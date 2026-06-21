import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchMeals, createMeal, deleteMeal } from "../services/mealService.js";
import { queryKeys } from "../utils/queryKeys.js";

/** Read all meals. */
export const useMeals = () =>
  useQuery({ queryKey: queryKeys.meals, queryFn: fetchMeals });

/**
 * Shared invalidation: after any meal change the meal list AND the dashboard
 * totals are stale, so we refetch both. This is what keeps the progress bars
 * updating "instantly" after add/delete.
 */
const useInvalidateMealData = () => {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: queryKeys.meals });
    qc.invalidateQueries({ queryKey: queryKeys.dashboard });
  };
};

/** Add a meal. */
export const useAddMeal = () => {
  const invalidate = useInvalidateMealData();
  return useMutation({
    mutationFn: createMeal,
    onSuccess: (meal) => {
      invalidate();
      toast.success(`${meal.foodName} added (${meal.calories} kcal)`);
    },
    onError: (err) => toast.error(err.message),
  });
};

/** Delete a meal. */
export const useDeleteMeal = () => {
  const invalidate = useInvalidateMealData();
  return useMutation({
    mutationFn: deleteMeal,
    onSuccess: () => {
      invalidate();
      toast.success("Meal removed");
    },
    onError: (err) => toast.error(err.message),
  });
};
