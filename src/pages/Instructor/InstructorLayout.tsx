import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import InstructorSidebar from '../../components/instructor/InstructorSidebar';
import InstructorNavbar from '../../components/instructor/InstructorNavbar';

export const InstructorLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <InstructorSidebar open={sidebarOpen} currentPage={currentPage} onToggleSidebar={handleToggleSidebar} setCurrentPage={setCurrentPage} />
      <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <InstructorNavbar />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default InstructorLayout;
