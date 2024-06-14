import React from 'react';
import { useTheme } from '../ui/theme-provider';
import { useNavigate } from 'react-router-dom';

const InstructorDashboard: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate()

  return (
    <div className="flex-1 overflow-auto p-6">
      <h1 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-700' : 'text-white'}`}>
        Instructor Dashboard
      </h1>
      <button className='btn btn-outline ' onClick={()=>navigate('/instructor/verifcation')} > check button </button>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Courses Box */}
        <div className={`rounded-md p-4 shadow-md transform transition-transform duration-200 hover:scale-105 ${theme === 'light' ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>
          <h2 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            Total Courses
          </h2>
          <p className="text-xl font-bold">8</p>
        </div>
        {/* Students Taught Box */}
        <div className={`rounded-md p-4 shadow-md transform transition-transform duration-200 hover:scale-105 ${theme === 'light' ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>
          <h2 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            Students Taught
          </h2>
          <p className="text-xl font-bold">200</p>
        </div>
        {/* Pending Requests Box */}
        <div className={`rounded-md p-4 shadow-md transform transition-transform duration-200 hover:scale-105 ${theme === 'light' ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>
          <h2 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            Pending Requests
          </h2>
          <p className="text-xl font-bold">5</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
