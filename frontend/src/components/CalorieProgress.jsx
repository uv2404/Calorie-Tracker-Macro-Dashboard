import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import ProgressBar from "./ProgressBar.jsx";

/**
 * The large daily calorie progress bar.
 * - Within budget: gradient Blue -> Green.
 * - Exceeded:      Crimson Red.
 * Shows "1840 / 2200 kcal" and remaining calories.
 */
export default function CalorieProgress({ dashboard }) {
  const {
    totalCalories,
    caloriePercentage,
    remainingCalories,
    exceeded,
    targets,
  } = dashboard;

  const barClass = exceeded
    ? "bg-gradient-to-r from-red-600 to-rose-500"
    : "bg-gradient-to-r from-blue-500 to-emerald-400";

  return (
    <div className="glass-card p-5 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className={exceeded ? "text-red-400" : "text-orange-400"} />
          <h2 className="text-lg font-semibold">Daily Calorie Budget</h2>
        </div>
        <motion.span
          key={totalCalories}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-lg font-bold ${exceeded ? "text-red-400" : "text-emerald-300"}`}
        >
          {totalCalories} / {targets.calorieTarget} kcal
        </motion.span>
      </div>

      <ProgressBar percent={caloriePercentage} barClass={barClass} height="h-5" />

      <div className="mt-2 flex items-center justify-between text-sm text-slate-400">
        <span>{caloriePercentage}% of target</span>
        <span className={exceeded ? "font-medium text-red-400" : ""}>
          {exceeded
            ? `${Math.abs(remainingCalories)} kcal over budget`
            : `${remainingCalories} kcal remaining`}
        </span>
      </div>
    </div>
  );
}
