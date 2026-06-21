import { AnimatePresence } from "framer-motion";
import MealCard from "./MealCard.jsx";
import EmptyState from "./EmptyState.jsx";

/** Responsive grid of logged meals (or the empty state). */
export default function MealGrid({ meals, onDelete, deletingId }) {
  if (!meals?.length) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {meals.map((meal) => (
          <MealCard
            key={meal._id}
            meal={meal}
            onDelete={onDelete}
            isDeleting={deletingId === meal._id}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
