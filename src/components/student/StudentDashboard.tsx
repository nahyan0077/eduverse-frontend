import React, { useEffect } from 'react';
import { useTheme } from '../ui/theme-provider';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { getEnrollmentByUserIdAction } from '@/redux/store/actions/enrollment';
import { RootState } from '@/redux/store';

const StudentDashboard: React.FC = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch()
  const {data} = useAppSelector((state: RootState) => state.user)

  useEffect(()=>{
    fetchCoursesEnrolled()
  },[])
  
  const fetchCoursesEnrolled = async () => {
    if (data?._id) {
      const response =  await dispatch(getEnrollmentByUserIdAction(data?._id))
      console.log(response.payload.data,"get all enrolled courses");
      
    }
  }

  return (
    <div className="flex-1 overflow-auto p-6">
      <h1 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-700' : 'text-white'}`}>
        Student Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Completed Courses Box */}
        <div className={`rounded-md p-4 shadow-md transform transition-transform duration-200 hover:scale-105 ${theme === 'light' ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>
          <h2 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            Completed Courses
          </h2>
          <p className="text-xl font-bold">10</p>
        </div>
        {/* Ongoing Courses Box */}
        <div className={`rounded-md p-4 shadow-md transform transition-transform duration-200 hover:scale-105 ${theme === 'light' ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>
          <h2 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            Ongoing Courses
          </h2>
          <p className="text-xl font-bold">3</p>
        </div>
        {/* Total Enrolled Courses Box */}
        <div className={`rounded-md p-4 shadow-md transform transition-transform duration-200 hover:scale-105 ${theme === 'light' ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>
          <h2 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            Total Enrolled Courses
          </h2>
          <p className="text-xl font-bold">13</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
