import { Activity } from "lucide-react";

/** App header / brand bar. */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-surface-900/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500">
          <Activity className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-lg font-bold leading-tight">Calorie Tracker</h1>
          <p className="text-xs text-slate-400">Macro Dashboard</p>
        </div>
      </div>
    </header>
  );
}
