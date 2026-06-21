import { motion } from "framer-motion";
import { Target } from "lucide-react";
import { GOAL_OPTIONS } from "../utils/constants.js";

/**
 * Fitness Goal toggle (Weight Loss / Maintenance / Muscle Gain).
 * Selecting an option triggers the goal update mutation; the animated pill
 * slides to the active option using a shared layoutId.
 */
export default function GoalToggle({ activeGoal, onChange, isUpdating }) {
  return (
    <div className="glass-card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <Target className="text-emerald-400" />
        <span className="font-semibold">Fitness Goal</span>
      </div>

      <div className="relative flex rounded-xl bg-white/5 p-1">
        {GOAL_OPTIONS.map((opt) => {
          const active = opt.value === activeGoal;
          return (
            <button
              key={opt.value}
              disabled={isUpdating}
              onClick={() => onChange(opt.value)}
              className={`relative z-10 flex-1 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-60 ${
                active ? "text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="goal-pill"
                  className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-blue-600 to-emerald-500"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
