import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BoltIcon from "@mui/icons-material/Bolt";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import VideocamIcon from "@mui/icons-material/Videocam";
import CodeIcon from "@mui/icons-material/Code";
import ArticleIcon from "@mui/icons-material/Article";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PhonelinkIcon from "@mui/icons-material/Phonelink";

const CourseDetails: React.FC<{ courseData: any }> = ({ courseData }) => {
  return (
    <div className="p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Includes
        </h2>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-center">
            <VideocamIcon className="mr-2" /> Content on-demand video
          </li>
          <li className="flex items-center">
            <CodeIcon className="mr-2" /> Coding exercises
          </li>
          <li className="flex items-center">
            <ArticleIcon className="mr-2" /> Quality articles
          </li>
          <li className="flex items-center">
            <CloudDownloadIcon className="mr-2" /> Downloadable resources
          </li>
          <li className="flex items-center">
            <PhonelinkIcon className="mr-2" /> Access on mobile and TV
          </li>
          <li className="flex items-center">
            <EmojiEventsIcon className="mr-2" /> Certificate of completion
          </li>
        </ul>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Course Details
        </h2>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-center">
            <PeopleIcon className="mr-2" /> {courseData.enrolledStudents}{" "}
            Enrolled Students
          </li>
          <li className="flex items-center">
            <AccessTimeIcon className="mr-2" /> {courseData.duration} hours
          </li>
          <li className="flex items-center">
            <LibraryBooksIcon className="mr-2" /> {courseData.lessons.length}{" "}
            Lessons
          </li>
          <li className="flex items-center">
            <BoltIcon className="mr-2" /> {courseData.level}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CourseDetails;
