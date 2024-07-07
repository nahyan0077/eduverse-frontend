import React from "react";
import { useTheme } from "../../ui/theme-provider";
import { motion } from "framer-motion";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  const { theme } = useTheme();

  const handleConfirmBlock = () => {
    onConfirm();
  };

  const handleCancelBlock = () => {
    onCancel();
  };

  return (
    <div
      className={`z-10 fixed inset-0 flex items-center justify-center ${
        theme === "light" ? "bg-white bg-opacity-50" : "bg-black bg-opacity-75"
      }`}>
      <motion.div
        className={`p-8 rounded-lg shadow-lg ${
          theme === "light"
            ? "text-black bg-gray-100"
            : "text-white bg-gray-900"
        }`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}>
        <p>{`Are you sure you want to ${message}?`}</p>
        <div className="flex justify-end mt-4">
          <button
            className="btn btn-sm btn-outline btn-primary mr-2"
            onClick={handleConfirmBlock}>
            Yes
          </button>
          <button
            className="btn btn-sm btn-outline btn-error"
            onClick={handleCancelBlock}>
            No
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmModal;
