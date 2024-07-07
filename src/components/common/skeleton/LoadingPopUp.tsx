import React from "react";

interface LoadingPopupProps {
  isLoading: boolean;
}

const LoadingPopUp: React.FC<LoadingPopupProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-violet-700 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingPopUp;
