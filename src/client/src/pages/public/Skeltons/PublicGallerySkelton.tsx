import React from "react";
const PublicGallerySkelton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="bg-white dark:bg-slate-950 py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-[#000080] dark:text-white animate-pulse"></h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 animate-pulse"></p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: count }).map((_, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-xl bg-gray-200 dark:bg-slate-800 animate-pulse border border-gray-300 dark:border-slate-700"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default PublicGallerySkelton;
