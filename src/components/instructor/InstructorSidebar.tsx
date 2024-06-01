import React from 'react';
import { motion } from 'framer-motion';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ClassIcon from '@mui/icons-material/Class';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SchoolIcon from '@mui/icons-material/School';

interface SidebarProps {
  open: boolean;
  currentPage: string;
  onToggleSidebar: () => void;
  setCurrentPage: (page: string) => void; 
  title: string; 
  items: { name: string; icon: React.ReactNode; }[]; 
}

const Sidebar: React.FC<SidebarProps> = ({ open, currentPage, onToggleSidebar, setCurrentPage, title, items }) => {
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
              {title}
            </motion.span>
          </div>
          <nav className="flex-1 flex flex-col space-y-4 mt-2">
            {/* Sidebar links */}
            {items.map((item, index) => (
              <a href="#" key={index} className={linkClasses(item.name.toLowerCase())} onClick={() => setCurrentPage(item.name.toLowerCase())}>
                {item.icon}
                <motion.span
                  initial="hidden"
                  animate={open ? "visible" : "hidden"}
                  variants={textVariants}
                  transition={{ duration: 0.3 }}
                  className="ml-2"
                >
                  {item.name}
                </motion.span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
