import { Salad } from "lucide-react";

/** Shown in the history grid when no meals are logged yet. */
export default function EmptyState() {
  return (
    <div className="glass-card flex flex-col items-center justify-center gap-3 p-10 text-center">
      <Salad className="h-10 w-10 text-emerald-400" />
      <h3 className="text-lg font-semibold">No meals logged yet</h3>
      <p className="max-w-sm text-sm text-slate-400">
        Add your first food using the panel on the left, or try the simulated
        “Image Upload” scanner to get started.
      </p>
    </div>
  );
}
