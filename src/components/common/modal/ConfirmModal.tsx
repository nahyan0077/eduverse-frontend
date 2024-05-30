import React from 'react';
import { useTheme } from '../../ui/theme-provider';

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel }) => {
  const { theme } = useTheme();

  const handleConfirmBlock = () => {
    onConfirm();
  };

  const handleCancelBlock = () => {
    onCancel();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${theme === 'light' ? 'bg-white bg-opacity-50' : 'bg-black bg-opacity-75'}`}>
      <div className={` p-8 rounded-lg shadow-lg ${theme === 'light' ? 'text-black bg-gray-100' : 'text-white bg-gray-900'}`}>
        <p>{`Are you sure you want to ${message}?`}</p>
        <div className="flex justify-end mt-4">
          <button className="btn btn-sm btn-outline btn-primary mr-2" onClick={handleConfirmBlock}>
            Yes
          </button>
          <button className="btn btn-sm btn-outline btn-error" onClick={handleCancelBlock}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
