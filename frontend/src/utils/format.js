/** Caps a percentage to [0, 100] for bar widths (true value can exceed 100). */
export const clampPercent = (pct) => Math.max(0, Math.min(100, pct ?? 0));

/** Formats a date string as a short, readable time. */
export const formatTime = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  });
