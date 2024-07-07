import React from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BoltIcon from "@mui/icons-material/Bolt";

const CourseInfo: React.FC<{ courseData: any; overallRating: number }> = ({
  courseData,
  overallRating,
}) => {
  return (
    <div className={`mb-4 bg-violet-200 dark:bg-gray-950 rounded-t-3xl p-6`}>
      <div className="flex items-center mb-2">
        <img
          src={courseData.instructorRef.profile.avatar}
          alt="Instructor"
          className="object-cover w-10 h-10 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500 mr-3 ml-1"
        />
        <div>
          <h2 className="text-lg font-bold">
            {courseData.instructorRef.firstName}{" "}
            {courseData.instructorRef.lastName}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Instructor</p>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-2">{courseData.title}</h1>
      <div className="flex items-center flex-wrap">
        <span className="text-yellow-500">★★★★☆</span>
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          ({overallRating})
        </span>
        <span className="ml-4 text-gray-600 dark:text-gray-400">
          <LibraryBooksIcon color="warning" fontSize="small" />{" "}
          {courseData.lessons.length} Lessons
        </span>
        <span className="ml-4 text-gray-600 dark:text-gray-400">
          <AccessTimeIcon color="warning" fontSize="small" />{" "}
          {courseData.duration} hours
        </span>
        <span className="ml-4 text-gray-600 dark:text-gray-400">
          <BoltIcon color="warning" fontSize="small" /> {courseData.level}
        </span>
      </div>
    </div>
  );
};

export default CourseInfo;
