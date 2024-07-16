import React, { useState } from "react";
import { ModeToggle } from "../ui/mode-toggle";
import ConfirmModal from "@/components/common/modal/ConfirmModal";
import { logoutAction } from "@/redux/store/actions/auth/logoutAction";
import { useAppDispatch } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { TiThMenuOutline } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";

const InstructorNavbar: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user);

  const handleDelete = async () => {
    dispatch(logoutAction()).then(() => {
      navigate("/");
    });
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleLogout = async () => {
    setModalVisible(true);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-900 sticky top-0 z-10 p-2">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <button className="md:hidden mr-2" onClick={toggleMobileMenu}>
                <TiThMenuOutline color="white" fontSize={24} />
              </button>
              <span className="font-bold text-lg lg:text-xl text-white">
                Instructor Panel
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar flex items-center">
                <img
                  src={userData.data?.profile?.avatar}
                  className="w-8 h-8 rounded-full"
                  alt=""
                />

              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                {!userData?.data?.isRequested && (
                  <li onClick={() => navigate("/instructor/profile")}>
                    <a>Profile</a>
                  </li>
                )}
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
            <p className="ml-4" > {userData.data?.userName} </p>
            <div className="ml-4">
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {[
                { text: "Dashboard", path: "/instructor" },
                { text: "Exams", path: "/instructor/exams" },
                { text: "Courses", path: "/instructor/courses" },
                { text: "Chats", path: "/instructor/chat" },
              ].map((item, index) => (
                <motion.a
                  key={item.text}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    navigate(item.path);
                    toggleMobileMenu();
                  }}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  {item.text}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isModalVisible && (
        <ConfirmModal
          message="Are you sure you want to logout?"
          onConfirm={handleDelete}
          onCancel={handleCancel}
        />
      )}
    </nav>
  );
};

export default InstructorNavbar;