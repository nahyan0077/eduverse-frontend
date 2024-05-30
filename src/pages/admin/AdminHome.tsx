// AdminSidebar.tsx remains unchanged

// AdminHome.tsx
import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import AdminDashboard from '../../components/admin/AdminDashBoard';
import { AdminInstructors } from '../../components/admin/AdminInstructors'; 
import AdminStudents from '@/components/admin/AdminStudents';
// import { AdminStudents } from '@/components/admin/AdminStudents';

const AdminHome: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard'); // Initialize currentPage state

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };



  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar
        open={sidebarOpen}
        currentPage={currentPage}
        onToggleSidebar={toggleSidebar}
        setCurrentPage={setCurrentPage} // Pass the item click handler to the sidebar
      />
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-margin duration-200 ease-in-out ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <AdminNavbar />
        <div className={`flex-1 overflow-auto`}>
          {/* Render components based on currentPage state */}
          {currentPage === 'dashboard' && <AdminDashboard />}
          {currentPage === 'instructors' && <AdminInstructors />}
          {currentPage === 'students' && <AdminStudents />}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
