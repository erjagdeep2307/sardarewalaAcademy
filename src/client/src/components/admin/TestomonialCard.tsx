import React from "react";

interface Props {
  count?: number;
}

const TestimonialCardSkeleton: React.FC<Props> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 flex flex-col animate-pulse"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-slate-700" />

              <div className="space-y-2">
                <div className="h-4 w-28 bg-gray-200 dark:bg-slate-700 rounded" />
                <div className="h-3 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="w-6 h-6 bg-gray-200 dark:bg-slate-700 rounded-md" />
              <div className="w-6 h-6 bg-gray-200 dark:bg-slate-700 rounded-md" />
            </div>
          </div>

          {/* Testimonial Text */}
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-full" />
            <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-11/12" />
            <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-10/12" />
            <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-9/12" />
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 flex items-center justify-between">
            <div className="flex space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-gray-200 dark:bg-slate-700 rounded-sm"
                />
              ))}
            </div>

            <div className="h-3 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export {TestimonialCardSkeleton};
