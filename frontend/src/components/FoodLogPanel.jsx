import { useState } from "react";
import { Plus, ImagePlus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { MOCK_SCAN, SUPPORTED_FOODS } from "../utils/constants.js";

/**
 * Logging panel: type a food + portion and Add, or click "Image Upload" to
 * simulate an AI scan (shows a 1s loader, then auto-fills Rice / 200g).
 * The component only collects input — all nutrient math happens server-side.
 */
export default function FoodLogPanel({ onAdd, isAdding }) {
  const [foodName, setFoodName] = useState("");
  const [portion, setPortion] = useState("");
  const [scanning, setScanning] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!foodName.trim()) return toast.error("Enter a food name");
    if (!portion || Number(portion) <= 0)
      return toast.error("Enter a portion greater than 0");

    onAdd(
      { foodName: foodName.trim(), portion: Number(portion) },
      {
        onSuccess: () => {
          setFoodName("");
          setPortion("");
        },
      }
    );
  };

  // Simulated AI image scan: 1s loading animation, then auto-fill mock values.
  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setFoodName(MOCK_SCAN.foodName);
      setPortion(String(MOCK_SCAN.portion));
      setScanning(false);
      toast.success("Image scanned: detected Rice (200g)");
    }, 1000);
  };

  return (
    <div className="glass-card p-5">
      <h2 className="mb-4 text-lg font-semibold">Log a Food</h2>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm text-slate-400">Food Name</label>
          <input
            list="food-suggestions"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="e.g. Chicken Breast"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-blue-500"
          />
          <datalist id="food-suggestions">
            {SUPPORTED_FOODS.map((f) => (
              <option key={f} value={f} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-400">Portion (grams)</label>
          <input
            type="number"
            min="1"
            value={portion}
            onChange={(e) => setPortion(e.target.value)}
            placeholder="e.g. 200"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={isAdding}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-emerald-500 px-4 py-2.5 font-medium transition hover:opacity-90 disabled:opacity-60"
          >
            {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Add Food
          </button>

          <button
            type="button"
            onClick={handleScan}
            disabled={scanning}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-medium transition hover:bg-white/10 disabled:opacity-60"
          >
            {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
            {scanning ? "Scanning…" : "Image Upload"}
          </button>
        </div>

        <p className="text-xs text-slate-500">
          Supported foods: {SUPPORTED_FOODS.join(", ")}
        </p>
      </form>
    </div>
  );
}
