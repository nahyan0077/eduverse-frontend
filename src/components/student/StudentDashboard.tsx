// StudentDashboard.tsx
import React, { useEffect, useState } from "react";
import { useTheme } from "../ui/theme-provider";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getEnrollmentByUserIdAction } from "@/redux/store/actions/enrollment";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaBook, FaListAlt } from "react-icons/fa";
import StreakDisplay from "./StreakDisplay";
import LoadingPopUp from "../common/skeleton/LoadingPopUp";
import { getUserData } from "@/redux/store/actions/auth";

const StudentDashboard: React.FC = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, loading } = useAppSelector((state: RootState) => state.user);
  const [completedCourses, setCompletedCourses] = useState<any[]>([]);
  const [ongoingCourses, setOngoingCourses] = useState<any[]>([]);
  const [totalCourses, setTotalCourses] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    fetchCoursesEnrolled();
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const response = await dispatch(getUserData());
    console.log(response.payload.data, "user data");
    setUserData(response.payload.data);
  };

  const fetchCoursesEnrolled = async () => {
    if (data?._id) {
      const response = await dispatch(getEnrollmentByUserIdAction(data?._id));
      const enrollments = response.payload.data;

      const completed = enrollments.filter(
        (course: any) => course.progress.overallCompletionPercentage === 100
      );
      const ongoing = enrollments.filter(
        (course: any) => course.progress.overallCompletionPercentage < 100
      );

      setCompletedCourses(completed);
      setOngoingCourses(ongoing);
      setTotalCourses(enrollments);
    }
  };

  if (loading) {
    return <LoadingPopUp isLoading={loading} />;
  }

  return (
    <div className={`flex-1 overflow-auto p-8`}>
      <h1
        className={`text-3xl font-bold mb-8 ${
          theme === "light" ? "text-gray-800" : "text-white"
        }`}>
        Welcome back, {data?.userName}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatBox
          title="Completed Courses"
          value={completedCourses.length}
          icon={<FaGraduationCap />}
          theme={theme}
        />
        <StatBox
          title="Ongoing Courses"
          value={ongoingCourses.length}
          icon={<FaBook />}
          theme={theme}
        />
        <StatBox
          title="Total Enrolled Courses"
          value={totalCourses.length}
          icon={<FaListAlt />}
          theme={theme}
        />
      </div>

      {/*<------------- student login streak -------------> */}

      <div className="mb-10">
        <StreakDisplay
          streak={userData?.loginStreak || 0}
          weeklyLogin={userData?.weeklyLogins || []}
          theme={theme}
        />
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-2xl font-semibold ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}>
            My Enrollments
          </h2>
          <button
            onClick={() => navigate("/student/enrollments")}
            className={`px-4 py-2 rounded-md transition duration-300 btn btn-outline btn-sm `}>
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {totalCourses.slice(0, 4).map((course: any) => (
            <CourseCard key={course._id} course={course} theme={theme} />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatBox: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  theme: string;
}> = ({ title, value, icon, theme }) => (
  <div
    className={`rounded-lg p-6 shadow-lg flex items-center ${
      theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"
    }`}>
    <div
      className={`text-3xl mr-4 ${
        theme === "light" ? "text-blue-600" : "text-blue-400"
      }`}>
      {icon}
    </div>
    <div>
      <h2
        className={`text-lg font-semibold mb-1 ${
          theme === "light" ? "text-gray-700" : "text-gray-300"
        }`}>
        {title}
      </h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

const CourseCard: React.FC<{ course: any; theme: string }> = ({
  course,
  theme,
}) => (
  <div
    className={`rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 ${
      theme === "light" ? "bg-white" : "bg-gray-800"
    }`}>
    <div className="flex flex-col sm:flex-row">
      <div className="sm:w-1/3">
        <img
          src={course.courseId.thumbnail || "https://via.placeholder.com/150"}
          alt={course.courseId.title}
          className="w-full h-48 sm:h-full object-cover"
        />
      </div>
      <div className="sm:w-2/3 p-6">
        <h3
          className={`text-xl font-semibold mb-3 ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}>
          {course.courseId.title}
        </h3>
        <p
          className={`text-sm mb-4 ${
            theme === "light" ? "text-gray-600" : "text-gray-300"
          }`}>
          Enrolled: {new Date(course.enrolledAt).toLocaleDateString()}
        </p>
        <div className="flex items-center justify-between">
          <p
            className={`text-sm font-medium ${
              theme === "light" ? "text-gray-600" : "text-gray-300"
            }`}>
            Completion:
          </p>
          <div className="flex items-center">
            <div
              className="radial-progress text-blue-600 mr-2"
              style={
                {
                  "--value": course.progress.overallCompletionPercentage,
                  "--size": "3rem",
                  "--thickness": "3px",
                } as React.CSSProperties
              }
              role="progressbar">
              <span className="text-sm font-bold">
                {Math.trunc(course.progress.overallCompletionPercentage)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default StudentDashboard;
