import { motion } from "framer-motion";
import { clampPercent } from "../utils/format.js";

/**
 * Generic animated progress bar.
 * @param {number} percent   - true percentage (may exceed 100)
 * @param {string} barClass  - tailwind classes for the fill (gradient/color)
 * @param {string} trackClass- tailwind classes for the track
 * @param {string} height    - tailwind height class (default h-3)
 */
export default function ProgressBar({
  percent,
  barClass = "bg-blue-500",
  trackClass = "bg-white/10",
  height = "h-3",
}) {
  const width = clampPercent(percent);
  return (
    <div className={`w-full overflow-hidden rounded-full ${trackClass} ${height}`}>
      <motion.div
        className={`${height} rounded-full ${barClass}`}
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
    </div>
  );
}
