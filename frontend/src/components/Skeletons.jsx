/** Reusable shimmer block used by the loading skeletons. */
const Shimmer = ({ className = "" }) => (
  <div className={`relative overflow-hidden rounded-lg bg-white/5 ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  </div>
);

/** Skeleton for the dashboard (calorie + macro bars) while data loads. */
export const DashboardSkeleton = () => (
  <div className="flex flex-col gap-4">
    <Shimmer className="h-28 w-full" />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Shimmer className="h-24" />
      <Shimmer className="h-24" />
      <Shimmer className="h-24" />
    </div>
  </div>
);

/** Skeleton grid for the meal history. */
export const MealGridSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: 3 }).map((_, i) => (
      <Shimmer key={i} className="h-32" />
    ))}
  </div>
);
