import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ChatIcon from "@mui/icons-material/Chat";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface SidebarProps {
  open: boolean;
  currentPage: string;
  onToggleSidebar: () => void;
  setCurrentPage: (page: string) => void;
}

const StudentSidebar: React.FC<SidebarProps> = ({
  open,
  currentPage,
  onToggleSidebar,
  setCurrentPage,
}) => {
  const sidebarVariants = {
    collapsed: { width: "5rem", transition: { duration: 0.3 } },
    expanded: { width: "16rem", transition: { duration: 0.3 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const linkClasses = (page: string) =>
    `px-4 py-4 ml-2 flex items-center text-gray-300 hover:bg-gray-950 hover:text-white transition-colors rounded-l-full  ${
      currentPage === page ? "bg-gray-950 text-white" : ""
    }`;

  return (
    <motion.div
      initial="collapsed"
      animate={open ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      className="fixed inset-y-0 left-0 z-30 bg-gray-900 overflow-hidden flex flex-col ">
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center px-4 py-6 mt-3">
            <button
              onClick={onToggleSidebar}
              className="text-gray-300 hover:text-white ml-2 mr-3 focus:outline-none">
              {!open ? <MenuRoundedIcon /> : <ArrowBackIcon />}
            </button>
            {open && (
              <motion.span
                initial="hidden"
                animate={open ? "visible" : "hidden"}
                variants={textVariants}
                className="font-semibold text-lg text-white">
                Student
              </motion.span>
            )}
          </div>
          <nav className="flex-1 flex flex-col space-y-4 mt-2">
            <Link
              to="/student"
              className={`${linkClasses("dashboard")} tooltip `}
              data-tip="Dashboard"
              onClick={() => setCurrentPage("dashboard")}>
              <DashboardIcon />
              <motion.span
                initial="hidden"
                animate={open ? "visible" : "hidden"}
                variants={textVariants}
                className="ml-2 ">
                Dashboard
              </motion.span>
            </Link>
            <Link
              to="/student/exams-list"
              className={`${linkClasses("exam-list")} tooltip `}
              data-tip="Exams"
              onClick={() => setCurrentPage("exam-list")}>
              <ClassIcon />
              <motion.span
                initial="hidden"
                animate={open ? "visible" : "hidden"}
                variants={textVariants}
                className="ml-2">
                Exams
              </motion.span>
            </Link>


            <Link
              to="/student/enrollments"
              className={`${linkClasses("enrollments")} tooltip `}
              data-tip="Enrollments"
              onClick={() => setCurrentPage("enrollments")}>
              <SubscriptionsIcon />
              <motion.span
                initial="hidden"
                animate={open ? "visible" : "hidden"}
                variants={textVariants}
                className="ml-2">
                Enrollments
              </motion.span>
            </Link>
            <Link
              to="/student/chat"
              className={`${linkClasses("chat")} tooltip `}
              data-tip="Chat"
              onClick={() => setCurrentPage("chat")}>
              <ChatIcon />
              <motion.span
                initial="hidden"
                animate={open ? "visible" : "hidden"}
                variants={textVariants}
                className="ml-2">
                Chats
              </motion.span>
            </Link>
          </nav>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentSidebar;
