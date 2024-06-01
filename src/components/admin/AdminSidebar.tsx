import React from 'react';
import { motion } from 'framer-motion';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ClassIcon from '@mui/icons-material/Class';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface SidebarProps {
  open: boolean;
  currentPage: string;
  onToggleSidebar: () => void;
  setCurrentPage: (page: string) => void; // Add setCurrentPage prop
}

const AdminSidebar: React.FC<SidebarProps> = ({ open, currentPage, onToggleSidebar, setCurrentPage }) => {
  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const linkClasses = (page: string) =>
    `px-4 py-2 flex items-center text-gray-300 hover:bg-gray-950 hover:text-white transition-colors rounded-l-full ${
      currentPage === page ? 'bg-gray-950 text-white' : ''
    }`;

  return (
    <motion.div
      initial={{ width: '5rem' }}
      animate={{ width: open ? '16rem' : '5rem' }}
      transition={{ duration: 0.3 }}
      className="fixed inset-y-0 left-0 bg-gray-900 overflow-hidden"
    >
      <div className={`h-full flex flex-col justify-between`}>
        <div>
          {/* Sidebar content */}
          <div className="flex items-center px-4 py-6">
            <button onClick={onToggleSidebar} className="text-gray-300 hover:text-white mr-3 focus:outline-none">
              <MenuRoundedIcon />
            </button>
            <motion.span
              initial="hidden"
              animate={open ? "visible" : "hidden"}
              variants={textVariants}
              transition={{ duration: 0.3 }}
              className="font-semibold text-lg text-white"
            >
              Admin Panel
            </motion.span>
          </div>
          <nav className="flex-1 flex flex-col space-y-4 mt-2">
            {/* Sidebar links */}
            <a href="#" className={linkClasses('dashboard')} onClick={() => setCurrentPage('dashboard')}>
              <DashboardIcon />
              <motion.span
                initial="hidden"
                animate={open ? "visible" : "hidden"}
                variants={textVariants}
                transition={{ duration: 0.3 }}
                className="ml-2"
              >
                Dashboard
              </motion.span>
            </a>
            <a href="#" className={linkClasses('instructors')} onClick={() => setCurrentPage('instructors')}>
              <PeopleIcon />
              <motion.span
                initial="hidden"
                animate={open ? "visible" : "hidden"}
                variants={textVariants}
                transition={{ duration: 0.3 }}
                className="ml-2"
              >
                Instructors
              </motion.span>
            </a>
            <a href="#" className={linkClasses('students')} onClick={() => setCurrentPage('students')}>
              <SchoolIcon />
              <motion.span
                initial="hidden"
                animate={open ? "visible" : "hidden"}
                variants={textVariants}
                transition={{ duration: 0.3 }}
                className="ml-2"
              >
                Students
              </motion.span>
            </a>
            <a href="#" className={linkClasses('courses')} onClick={() => setCurrentPage('courses')}>
              <ClassIcon />
              <motion.span
                initial="hidden"
                animate={open ? "visible" : "hidden"}
                variants={textVariants}
                transition={{ duration: 0.3 }}
                className="ml-2"
              >
                Courses
              </motion.span>
            </a>
            <a href="#" className={linkClasses('requests')} onClick={() => setCurrentPage('requests')}>
              <AccessTimeIcon />
              <motion.span
                initial="hidden"
                animate={open ? "visible" : "hidden"}
                variants={textVariants}
                transition={{ duration: 0.3 }}
                className="ml-2"
              >
                Requests
              </motion.span>
            </a>
          </nav>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
