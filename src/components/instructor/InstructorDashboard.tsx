import React, { useEffect, useState } from "react";
import { useTheme } from "../ui/theme-provider";
import { getCoursesByInstructorIdAction } from "@/redux/store/actions/course";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import { FaGraduationCap, FaBook, FaClipboardList, FaRupeeSign  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const InstructorDashboard: React.FC = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RootState) => state.user);
  const [instructorCourses, setInstructorCourses] = useState<any[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchInstructorCourses();
  }, []);

  const fetchInstructorCourses = async () => {
    if (data?._id) {
      const response = await dispatch(getCoursesByInstructorIdAction(data?._id));
      setInstructorCourses(response.payload.data);
    }
  };

  const totalCourses = instructorCourses.length;
  const studentsTaught = instructorCourses.reduce(
    (acc, course) => acc + course.lessons.reduce((sum: number, lesson: any) => sum + (lesson.studentsEnrolled?.length || 0), 0),
    0
  );
  // const pendingRequests = instructorCourses.filter(course => course.isRequested).length;
  const totalEarnings = data?.profit

  return (
    <div className={`flex-1 overflow-auto p-8 `}>
      <h1 className={`text-3xl font-bold mb-8 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
        Welcome, Instructor {data?.userName}!
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatBox
          title="Total Courses"
          value={totalCourses}
          icon={<FaBook />}
          theme={theme}
        />
        <StatBox
          title="Students Taught"
          value={studentsTaught}
          icon={<FaGraduationCap />}
          theme={theme}
        />
        <StatBox
          title="Total Earnings"
          value={totalEarnings}
          icon={<FaRupeeSign />}
          theme={theme}
        />
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-semibold ${theme === "light" ? "text-gray-800" : "text-white"}`}>
            My Recent Courses
          </h2>
          <button
            className={`px-4 py-2 rounded-md transition duration-300 btn btn-sm btn-outline`}
            onClick={()=>navigate('/instructor/courses')}
          >
            View All Courses
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
          {instructorCourses.slice(0, 4).map(course => (
            <CourseCard key={course._id} course={course} theme={theme} />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatBox: React.FC<{ title: string; value: number | string | undefined; icon: React.ReactNode; theme: string }> = ({
  title,
  value,
  icon,
  theme,
}) => (
  <div
    className={`rounded-lg p-6 shadow-lg flex items-center ${
      theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"
    }`}
  >
    <div className={`text-3xl mr-4 ${theme === "light" ? "text-blue-600" : "text-blue-400"}`}>
      {icon}
    </div>
    <div>
      <h2 className={`text-lg font-semibold mb-1 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
        {title}
      </h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

const CourseCard: React.FC<{ course: any; theme: string }> = ({ course, theme }) => {
  const navigate = useNavigate()

  return (
   <div
     className={`rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105  ${
       theme === "light" ? "bg-white" : "bg-gray-800"
     }`}
   >
     <div className="flex flex-col sm:flex-row">
       <div className="sm:w-1/3">
         <img
           src={course.thumbnail || "https://via.placeholder.com/150"}
           alt={course.title}
           className="w-full h-48 sm:h-full object-cover"
         />
       </div>
       <div className="sm:w-2/3 p-6">
         <h3 className={`text-xl font-semibold mb-2 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
           {course.title}
         </h3>
         <p className={`text-sm mb-2 ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
           Level: {course.level}
         </p>
         <p className={`text-sm mb-4 ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
           {course.description.length > 100 ? `${course.description.substring(0, 100)}...` : course.description}
         </p>
  
         <div className="flex ">
  
           <button
             className={`flex-1 py-2 px-3 rounded text-sm font-medium ${
               theme === "light" ? "bg-green-500 text-white hover:bg-green-600" : "bg-green-700 text-white hover:bg-green-800"
             }`}
            onClick={()=>navigate('/instructor/courses')}
           >
             View Details
           </button>
         </div>
       </div>
     </div>
   </div>
  );
}

  

export default InstructorDashboard;