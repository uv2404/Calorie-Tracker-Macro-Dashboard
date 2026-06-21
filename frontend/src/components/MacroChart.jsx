import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { PieChart as PieIcon } from "lucide-react";

const COLORS = ["#38bdf8", "#f59e0b", "#ec4899"]; // protein, carbs, fat

/**
 * Donut chart of the consumed macro split (grams) using Recharts.
 * Renders a friendly placeholder when nothing has been logged yet.
 */
export default function MacroChart({ dashboard }) {
  const data = [
    { name: "Protein", value: dashboard.totalProtein },
    { name: "Carbs", value: dashboard.totalCarbs },
    { name: "Fat", value: dashboard.totalFat },
  ];
  const hasData = data.some((d) => d.value > 0);

  return (
    <div className="glass-card p-5">
      <div className="mb-2 flex items-center gap-2">
        <PieIcon className="h-5 w-5 text-pink-400" />
        <h2 className="text-lg font-semibold">Macro Split</h2>
      </div>

      {hasData ? (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
              }}
              formatter={(value) => [`${value} g`, ""]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="py-16 text-center text-sm text-slate-400">
          Log a meal to see your macro breakdown.
        </p>
      )}
    </div>
  );
}
