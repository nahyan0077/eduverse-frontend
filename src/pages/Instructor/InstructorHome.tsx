import React, { useState } from 'react';
import Sidebar from '../../components/instructor/InstructorSidebar';
import Navbar from '../../components/instructor/InstructorNavbar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';

const InstructorHome: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard'); // Initialize currentPage state

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Define sidebar items
  const adminItems = [
    { name: 'Dashboard', icon: <DashboardIcon /> },
    { name: 'Instructors', icon: <PeopleIcon /> },
    { name: 'Students', icon: <SchoolIcon /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        open={sidebarOpen}
        currentPage={currentPage}
        onToggleSidebar={toggleSidebar}
        setCurrentPage={setCurrentPage}
        title="Admin Panel"
        items={adminItems} // Pass the sidebar items
      />
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-margin duration-200 ease-in-out ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <Navbar />
        <div className={`flex-1 overflow-auto`}>
          {/* Render components based on currentPage state */}
          

        </div>
      </div>
    </div>
  );
};

export default InstructorHome;
