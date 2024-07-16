import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "../ui/mode-toggle";
import ConfirmModal from "@/components/common/modal/ConfirmModal";
import { logoutAction } from "@/redux/store/actions/auth/logoutAction";
import { useAppDispatch } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import HouseIcon from "@mui/icons-material/House";
import { TiThMenuOutline } from "react-icons/ti";

const StudentNavbar: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user);

  const handleDelete = async () => {
    dispatch(logoutAction()).then(() => {
      navigate("/");
    });

    console.log("Item deleted");
    setModalVisible(false);
  };

  const handleCancel = () => {
    console.log("Action cancelled");
    setModalVisible(false);
  };

  const handleLogout = async () => {
    setModalVisible(true);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-900 p-4 lg:px-6 lg:py-3 z-10 sticky top-0">
      {isModalVisible && (
        <ConfirmModal
          message="  logout?"
          onConfirm={handleDelete}
          onCancel={handleCancel}
        />
      )}
      <div className=" mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="md:hidden mr-4" onClick={toggleMobileMenu}>
            <TiThMenuOutline color="white" fontSize={30} />
          </div>
          <span className="font-bold text-md lg:text-2xl text-white">
            Student Panel
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden lg:block">
            <div
              className="cursor-pointer hover:bg-gray-800 p-2 rounded-xl"
              onClick={() => navigate("/home")}
            >
              <HouseIcon color="primary" />
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar flex items-center"
            >
              <img
                src={userData.data?.profile?.avatar}
                className="w-10 rounded-full"
                alt=""
              />
              <p> {userData.data?.userName} </p>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={() => navigate("/student/profile")}>Profile</a>
              </li>
              <li>
                <a onClick={() => navigate("/home")}>Home</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
          <ModeToggle />
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-800"
          >
            <motion.ul className="py-4 px-2">
              {[
                { text: "Dashboard", path: "/student" },
                { text: "Exams", path: "/student/exams-list" },
                { text: "Enrollments", path: "/student/enrollments" },
                { text: "Chats", path: "/student/chat" },
              ].map((item, index) => (
                <motion.li
                  key={item.text}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.1 }}
                  className="py-2"
                >
                  <a 
                      onClick={() => {
                      navigate(item.path);
                      toggleMobileMenu();
                    }}
                    className="text-white block px-4 py-2 hover:bg-gray-700 rounded"
                  >
                    {item.text}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default StudentNavbar;