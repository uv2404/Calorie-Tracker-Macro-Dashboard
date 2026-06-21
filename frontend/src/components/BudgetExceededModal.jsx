import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

/**
 * Over-budget warning modal. Animated with Framer Motion; opens automatically
 * when the user crosses their calorie target (driven by BudgetAlertContext).
 */
export default function BudgetExceededModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="glass-card w-full max-w-md border-red-500/30 p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/15">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </span>
              <h2 className="text-xl font-bold text-red-400">Daily Budget Exceeded!</h2>
            </div>

            <p className="text-slate-300">
              You have consumed more calories than your target. Consider lighter
              options for your next meal, or adjust your fitness goal.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="flex items-center gap-1 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium hover:bg-white/10"
              >
                <X className="h-4 w-4" /> Close
              </button>
              <button
                onClick={onClose}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium hover:bg-red-500"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
