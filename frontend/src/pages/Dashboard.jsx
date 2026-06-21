import { useState } from "react";
import { AlertCircle } from "lucide-react";

import { useGoal, useUpdateGoal } from "../hooks/useGoals.js";
import { useMeals, useAddMeal, useDeleteMeal } from "../hooks/useMeals.js";
import { useDashboard } from "../hooks/useDashboard.js";

import { BudgetAlertProvider, useBudgetAlert } from "../context/BudgetAlertContext.jsx";

import GoalToggle from "../components/GoalToggle.jsx";
import FoodLogPanel from "../components/FoodLogPanel.jsx";
import CalorieProgress from "../components/CalorieProgress.jsx";
import MacroBars from "../components/MacroBars.jsx";
import MacroChart from "../components/MacroChart.jsx";
import MealGrid from "../components/MealGrid.jsx";
import BudgetExceededModal from "../components/BudgetExceededModal.jsx";
import { DashboardSkeleton, MealGridSkeleton } from "../components/Skeletons.jsx";

/** Inline error banner for failed queries. */
const ErrorBanner = ({ message }) => (
  <div className="glass-card flex items-center gap-3 border-red-500/30 p-4 text-red-300">
    <AlertCircle className="h-5 w-5 shrink-0" />
    <span className="text-sm">{message}</span>
  </div>
);

/** Renders the modal wired to the budget-alert context. */
const BudgetModal = () => {
  const { isOpen, close } = useBudgetAlert();
  return <BudgetExceededModal isOpen={isOpen} onClose={close} />;
};

export default function Dashboard() {
  const goalQuery = useGoal();
  const updateGoal = useUpdateGoal();
  const mealsQuery = useMeals();
  const dashboardQuery = useDashboard();
  const addMeal = useAddMeal();
  const deleteMeal = useDeleteMeal();

  // Track which card is mid-deletion so only that spinner shows.
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = (id) => {
    setDeletingId(id);
    deleteMeal.mutate(id, { onSettled: () => setDeletingId(null) });
  };

  const handleAddMeal = (payload, opts) => addMeal.mutate(payload, opts);

  const dashboard = dashboardQuery.data;
  const exceeded = dashboard?.exceeded ?? false;

  return (
    <BudgetAlertProvider exceeded={exceeded}>
      <div className="flex flex-col gap-6">
        {/* 1. Fitness Goal toggle */}
        {goalQuery.isError ? (
          <ErrorBanner message={goalQuery.error.message} />
        ) : (
          <GoalToggle
            activeGoal={goalQuery.data?.goal}
            onChange={(g) => updateGoal.mutate(g)}
            isUpdating={updateGoal.isPending || goalQuery.isLoading}
          />
        )}

        {/* 2. Dashboard (calorie + macro bars + chart) */}
        <section className="flex flex-col gap-4">
          {dashboardQuery.isLoading ? (
            <DashboardSkeleton />
          ) : dashboardQuery.isError ? (
            <ErrorBanner message={dashboardQuery.error.message} />
          ) : (
            <>
              <CalorieProgress dashboard={dashboard} />
              <MacroBars dashboard={dashboard} />
            </>
          )}
        </section>

        {/* 3. Log panel + macro chart side by side on large screens */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FoodLogPanel onAdd={handleAddMeal} isAdding={addMeal.isPending} />
          {dashboard && <MacroChart dashboard={dashboard} />}
        </section>

        {/* 4. Daily history */}
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Daily History</h2>
          {mealsQuery.isLoading ? (
            <MealGridSkeleton />
          ) : mealsQuery.isError ? (
            <ErrorBanner message={mealsQuery.error.message} />
          ) : (
            <MealGrid
              meals={mealsQuery.data}
              onDelete={handleDelete}
              deletingId={deletingId}
            />
          )}
        </section>
      </div>

      {/* 5. Over-budget modal */}
      <BudgetModal />
    </BudgetAlertProvider>
  );
}
