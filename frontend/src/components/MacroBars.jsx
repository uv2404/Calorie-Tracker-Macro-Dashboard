import ProgressBar from "./ProgressBar.jsx";

/** Config for the three macro meters. */
const MACROS = [
  {
    key: "protein",
    label: "Protein",
    totalKey: "totalProtein",
    pctKey: "proteinPercentage",
    targetKey: "proteinTarget",
    bar: "bg-gradient-to-r from-sky-500 to-cyan-400",
  },
  {
    key: "carbs",
    label: "Carbs",
    totalKey: "totalCarbs",
    pctKey: "carbPercentage",
    targetKey: "carbTarget",
    bar: "bg-gradient-to-r from-amber-500 to-yellow-400",
  },
  {
    key: "fat",
    label: "Fat",
    totalKey: "totalFat",
    pctKey: "fatPercentage",
    targetKey: "fatTarget",
    bar: "bg-gradient-to-r from-fuchsia-500 to-pink-400",
  },
];

/** Three smaller horizontal progress meters for the macronutrients. */
export default function MacroBars({ dashboard }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {MACROS.map((m) => {
        const total = dashboard[m.totalKey];
        const target = dashboard.targets[m.targetKey];
        const pct = dashboard[m.pctKey];
        return (
          <div key={m.key} className="glass-card p-4">
            <div className="mb-2 flex items-baseline justify-between">
              <span className="font-medium">{m.label}</span>
              <span className="text-sm text-slate-400">{pct}%</span>
            </div>
            <ProgressBar percent={pct} barClass={m.bar} />
            <p className="mt-2 text-sm text-slate-300">
              {total}g / {target}g
            </p>
          </div>
        );
      })}
    </div>
  );
}
