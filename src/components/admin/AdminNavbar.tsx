import React, { useState } from 'react';
import { ModeToggle } from "../ui/mode-toggle";
import { IoMdPerson } from 'react-icons/io'; 

const AdminNavbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-4 lg:px-6 lg:py-3 z-10">
      <div className="flex items-center">

            <span className='font-bold text-2xl pl-2' >Admin Panel</span>
        {/* Add any additional navbar items here */}
      </div>
      <div className="flex items-center">
        <ModeToggle />
        <div className="flex items-center ml-4">
          <IoMdPerson className="text-white cursor-pointer" onClick={toggleDropdown} />
          {isDropdownOpen && (
            <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded shadow-lg p-2">
              <button onClick={handleLogout} className="block w-full text-left text-gray-800 hover:bg-gray-200 py-1 px-2 rounded">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
