import { useAppDispatch } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import { getEnrollmentByUserIdAction } from "@/redux/store/actions/enrollment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../common/admin/SearchBar";
import { BookOpenIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

export const StudentEnrollments: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data._id) {
      fetchEnrollments();
    }
  }, [data]);

  const fetchEnrollments = async () => {
    if (data && data._id) {
      const response: any = await dispatch(
        getEnrollmentByUserIdAction(data._id)
      );
      const fetchedEnrollments = response.payload.data;
      setEnrollments(fetchedEnrollments);
      setIsEmpty(fetchedEnrollments.length === 0);
    }
  };

  const handleSearchChange = () => {
    // Implement search functionality
  };

  return (
    <div className=" min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
            <Player
              autoplay
              loop
              src="https://lottie.host/2a21cfdf-5523-444f-a483-a4673cd63c49/bKl0W0Zndb.json"
              style={{ height: "250px", width: "250px" }}
            />
            <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
              No enrollments found
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Explore our courses and start learning today!
            </p>
          </div>
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
                My Courses
              </h1>
              <SearchBar onSearchChange={handleSearchChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {enrollments.map((enrollment: any) => (
                <div
                  key={enrollment._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
                  onClick={() =>
                    navigate("/student/single-enrollment", {
                      state: {
                        enrollmentId: enrollment._id,
                        courseId: enrollment.courseId._id,
                      },
                    })
                  }>
                  <img
                    src={enrollment.courseId.thumbnail}
                    alt={enrollment.courseId.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {enrollment.courseId.title
                        .split(" ")
                        .slice(0, 5)
                        .join(" ")}
                    </h2>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <AcademicCapIcon className="h-5 w-5 mr-2" />
                      <span>{enrollment.courseId.level}</span>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Progress
                        </span>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {enrollment.progress.overallCompletionPercentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{
                            width: `${enrollment.progress.overallCompletionPercentage}%`,
                          }}></div>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300 flex items-center justify-center">
                      <BookOpenIcon className="h-5 w-5 mr-2" />
                      Continue Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
