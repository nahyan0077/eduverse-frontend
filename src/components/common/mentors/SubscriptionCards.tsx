import React, { useState } from "react";
import { motion } from "framer-motion";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import toast, { Toaster } from "react-hot-toast";
import subscribe from "@/assets/exam/subscribe.svg";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";
import { useNavigate } from "react-router-dom";

interface SubscriptionCardProps {
  title: string;
  price: string;
  description1: string;
  description2: string;
  description3: string;
  isPopular?: boolean;
  index: number;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  price,
  description1,
  description2,
  description3,
  isPopular,
  index,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data } = useAppSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalOpen = () => {
    if (data?._id) {
      setModalOpen(true);
    } else {
      toast.error("Please login subscribe");
    }
  };

  return (
    <>
      <Toaster />
      <motion.div
        className={`
          relative overflow-hidden rounded-2xl shadow-lg
          ${isPopular ? "bg-violet-700 " : "bg-white dark:bg-gray-800 "}
          hover:shadow-2xl transition-all duration-300
          ${isPopular ? "scale-105" : "hover:scale-105"}
        `}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={index}
        whileHover={{ y: 10 }}>
        {isPopular && (
          <motion.div
            className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-bl-lg"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}>
            Popular
          </motion.div>
        )}
        <div className="p-8 text-center mb-12">
          <h3
            className={`text-2xl font-bold mb-4 ${
              isPopular ? "text-white" : "text-gray-900 dark:text-white"
            }`}>
            {title}
          </h3>
          <p
            className={`text-4xl font-extrabold mb-6 ${
              isPopular ? "text-yellow-400" : "text-violet-600"
            }`}>
            {price}
          </p>
          <p
            className={`mb-4 ${
              isPopular ? "text-gray-200" : "text-gray-600 dark:text-gray-300"
            }`}>
            <DoneAllIcon color="secondary" /> {description1}
          </p>
          <p
            className={`mb-4 ${
              isPopular ? "text-gray-200" : "text-gray-600 dark:text-gray-300"
            }`}>
            <DoneAllIcon color="secondary" /> {description2}
          </p>
          <p
            className={`mb-4 ${
              isPopular ? "text-gray-200" : "text-gray-600 dark:text-gray-300"
            }`}>
            <DoneAllIcon color="secondary" /> {description3}
          </p>
          <motion.button
            className={`
              py-3 px-6 rounded-full text-lg font-semibold
              ${
                isPopular
                  ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                  : "bg-violet-600 text-white hover:bg-violet-700"
              }
              transition duration-300
            `}
            onClick={handleModalOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            Get Started
          </motion.button>
        </div>
      </motion.div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 max-w-xl w-full mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold  text-gray-800 dark:text-white">
                Access Mentor Chat
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors focus:outline-none"
                onClick={handleModalClose}>
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="flex justify-center items-center mb-6">
              <img
                src={subscribe}
                alt="Subscribe"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
            <div className="space-y-4 mb-6">
              <p className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <WarningIcon className="w-5 h-5 text-red-500 mr-2" />
                Please purchase any course to get access to the mentor.
              </p>
              <p className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <WarningIcon className="w-5 h-5 text-red-500 mr-2" />
                If you've already purchased, go to the dashboard.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
              <button
                className="w-full sm:w-auto bg-violet-600 text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-violet-700 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
                onClick={() => navigate("/courses")}>
                Courses
              </button>
              <button
                className="w-full sm:w-auto bg-violet-600 text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-violet-700 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
                onClick={() => navigate("/student/")}>
                Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
