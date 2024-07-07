import React from "react";

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="h-48 w-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 mb-4"></div>
        <div className="flex items-center justify-between">
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
};
