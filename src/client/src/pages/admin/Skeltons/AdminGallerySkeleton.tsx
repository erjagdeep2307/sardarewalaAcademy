import React from "react";

const AdminGallerySkeleton: React.FC<{ count?: number }> = ({ count = 10 }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
      
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 w-64 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="aspect-square rounded-xl bg-gray-200 dark:bg-slate-800 animate-pulse border border-gray-300 dark:border-slate-700"
          />
        ))}
      </div>

    </div>
  );
};

export default AdminGallerySkeleton;
