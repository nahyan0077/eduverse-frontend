// StreakDisplay.tsx
import React from "react";
import { FaFire } from "react-icons/fa";

const StreakDisplay: React.FC<{ streak: number; weeklyLogin: boolean[]; theme: string }> = ({
  streak,
  weeklyLogin,
  theme,
}) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div
      className={`rounded-lg p-6 shadow-lg ${
        theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-semibold ${theme === "light" ? "text-gray-800" : "text-white"}`}>
          Your Learning Streak
        </h2>
        <div className="flex items-center">
          <FaFire className={`text-2xl mr-2 ${theme === "light" ? "text-orange-500" : "text-orange-400"}`} />
          <span className="text-2xl font-bold">{streak}</span>
          <span className="ml-1 text-sm font-medium">days</span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 mb-1 flex items-center justify-center rounded-full ${
                weeklyLogin[index]
                  ? theme === "light"
                    ? "bg-green-500 text-white"
                    : "bg-green-400 text-gray-900"
                  : theme === "light"
                  ? "bg-gray-200 text-gray-400"
                  : "bg-gray-700 text-gray-400"
              }`}
            >
              {weeklyLogin[index] && (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className={`text-xs font-medium ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
              {day}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
          Keep up the great work! Log in daily to maintain your streak.
        </p>
      </div>
    </div>
  );
};

export default StreakDisplay;