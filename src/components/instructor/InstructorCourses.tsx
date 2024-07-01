import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { getAllCourseAction } from "@/redux/store/actions/course";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CourseEntity, Lesson } from "@/types/ICourse";
import { Player } from "@lottiefiles/react-lottie-player";
import { FaBook, FaClock, FaUsers } from "react-icons/fa";

const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  let result = "";

  if (h > 0) result += `${h}h `;
  if (m > 0) result += `${m}m `;
  if (s > 0 || (h === 0 && m === 0)) result += `${s}s`;

  return result.trim();
};

export const InstructorCourses: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [courseData, setCourseData] = useState<any[]>([]);

  const { data } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await dispatch(getAllCourseAction({ page: 1, limit: 10 }));
      if (getAllCourseAction.fulfilled.match(result)) {
        setCourseData(result.payload.data.courses);
      } else {
        console.error("Failed to fetch courses:", result.payload);
      }
    };

    fetchCourses();
  }, [dispatch]);

  const handleClick = () => {
    navigate("/instructor/add-course");
  };

  const instructorCourse = courseData.filter((course) => course.instructorRef._id === data?._id);

  const calculateTotalDuration = (lessons: Lesson[]) => {
    return lessons
      .filter((lesson) => lesson.duration !== undefined)
      .reduce((total, lesson) => total + parseFloat(lesson.duration!), 0);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">My Courses</h1>
        <button
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add New Course
        </button>
      </div>

      {instructorCourse.length === 0 ? (
        <div className="text-center py-12">
          <Player
            autoplay
            loop
            src="https://lottie.host/2a21cfdf-5523-444f-a483-a4673cd63c49/bKl0W0Zndb.json"
            style={{ height: "200px", width: "200px", margin: "0 auto" }}
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
            No courses found
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Start creating your first course by clicking the "Add New Course" button above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructorCourse.map((course: CourseEntity) => {
            const totalDurationSeconds = calculateTotalDuration(course.lessons ?? []);
            const formattedDuration = formatDuration(totalDurationSeconds);

            return (
              <div
                key={course._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105"
              >
                <img
                  src={course.thumbnail || "https://via.placeholder.com/400x200"}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FaBook className="mr-2" />
                      {course.lessons?.length || 0} Lessons
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FaClock className="mr-2" />
                      {formattedDuration}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FaUsers className="mr-2" />
                      {course?.studentsEnrolled} Students
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    {course.isPublished ? (
                      <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                        Published
                      </span>
                    ) : course.isRejected ? (
                      <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                        Rejected
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                        Pending
                      </span>
                    )}
                    <button
                      className="btn btn-sm btn-outline btn-primary"
                      onClick={() =>
                        navigate("/instructor/single-course", {
                          state: { course: { ...course, duration: formattedDuration } },
                        })
                      }
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};