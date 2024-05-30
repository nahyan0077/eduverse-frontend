import React from 'react';
import { useTheme } from '../../ui/theme-provider';

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel }) => {
  const { theme } = useTheme();

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${theme === 'light' ? 'bg-black bg-opacity-50' : 'bg-black bg-opacity-75'}`}>
      <div className={`bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-lg max-w-md w-full`}>
        <div className="flex flex-col justify-between h-full">
          <p className="text-md mb-4">Are you sure you want to {message}?</p>
          <div className="flex justify-end space-x-2 mt-auto">
            <button 
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={onConfirm}
            >
              Yes
            </button>
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={onCancel}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
