import { motion } from "framer-motion";
import { Trash2, Loader2 } from "lucide-react";
import { formatTime } from "../utils/format.js";

/** A single logged meal card with its macros, timestamp and a delete button. */
export default function MealCard({ meal, onDelete, isDeleting }) {
  const stat = (label, value, unit) => (
    <div className="rounded-lg bg-white/5 px-2 py-1.5 text-center">
      <p className="text-sm font-semibold">{value}{unit}</p>
      <p className="text-[10px] uppercase tracking-wide text-slate-400">{label}</p>
    </div>
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="glass-card flex flex-col gap-3 p-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold capitalize">{meal.foodName}</h3>
          <p className="text-xs text-slate-400">
            {meal.portion}g · {formatTime(meal.createdAt)}
          </p>
        </div>
        <button
          onClick={() => onDelete(meal._id)}
          disabled={isDeleting}
          aria-label={`Delete ${meal.foodName}`}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
        >
          {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {stat("kcal", meal.calories, "")}
        {stat("Protein", meal.protein, "g")}
        {stat("Carbs", meal.carbs, "g")}
        {stat("Fat", meal.fat, "g")}
      </div>
    </motion.div>
  );
}
