import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  AccessTime as AccessTimeIcon,
  Assignment as AssignmentIcon,
  Bolt as BoltIcon,
  CloudDownload as CloudDownloadIcon,
  Code as CodeIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  EmojiEvents as EmojiEventsIcon,
  LibraryBooks as LibraryBooksIcon,
  People as PeopleIcon,
  Phonelink as PhonelinkIcon,
  PlayArrow as PlayArrowIcon,
  Style as StyleIcon,
  ThumbUpAlt as ThumbUpAltIcon,
  Videocam as VideocamIcon,
  Article as ArticleIcon,
} from "@mui/icons-material";
import { useTheme } from "../../ui/theme-provider";
import LoadingPopUp from "../../common/skeleton/LoadingPopUp";

export const SingleCoursePage: React.FC = () => {
  const [courseData, setCourseData] = useState<any>(null);
  const location = useLocation();
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.course) {
      setCourseData(location.state.course);
      console.log(location.state.course, "single product data");
    }
  }, [location.state]);

  const baseClasses = "transition-all duration-300 ease-in-out";
  const textClasses = theme === "light" ? "text-gray-800" : "text-gray-200";
  const bgClasses = theme === "light" ? "bg-white" : "bg-gray-800";
  const borderClasses =
    theme === "light" ? "border-gray-200" : "border-gray-700";

  return (
    <div className={`min-h-screen max-w-7xl mx-auto p-6 ${textClasses}`}>
      {courseData ? (
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Left Section */}
          <div className={`lg:w-2/3 ${bgClasses} rounded-xl shadow-lg p-8`}>
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <img
                  src={courseData?.thumbnail}
                  alt="Instructor"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h2 className="text-xl font-bold">
                    {courseData.instructorRef.firstName}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Instructor
                  </p>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-4">{courseData?.title}</h1>
              <div className="flex items-center flex-wrap gap-4 text-sm">
                <span className="text-yellow-500">★★★★☆ (15)</span>
                <span className="flex items-center">
                  <LibraryBooksIcon className="mr-1" fontSize="small" />
                  {courseData.lessons.length} Lessons
                </span>
                <span className="flex items-center">
                  <AccessTimeIcon className="mr-1" fontSize="small" />
                  {courseData.duration} hours
                </span>
                <span className="flex items-center">
                  <BoltIcon className="mr-1" fontSize="small" />
                  {courseData.level}
                </span>
              </div>
            </div>

            <div
              className={`${bgClasses} ${borderClasses} border rounded-lg p-6 mb-8`}>
              <h3 className="text-xl font-bold mb-4">Overview</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {courseData?.description}
              </p>

              <h3 className="text-xl font-bold mb-4">What you'll learn</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                <li>Become a UX designer.</li>
                <li>You will be able to add UX designer to your CV</li>
                <li>Become a UI designer.</li>
                <li>Build & test a full website design.</li>
              </ul>
            </div>

            <div
              className={`${bgClasses} ${borderClasses} border rounded-lg p-6 mb-8`}>
              <h2 className="text-2xl font-bold mb-6">This course includes:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-400">
                {[
                  { icon: <VideocamIcon />, text: "Content on-demand video" },
                  { icon: <CodeIcon />, text: "Coding exercises" },
                  { icon: <ArticleIcon />, text: "65 articles" },
                  {
                    icon: <CloudDownloadIcon />,
                    text: "Downloadable resources",
                  },
                  { icon: <PhonelinkIcon />, text: "Access on mobile and TV" },
                  {
                    icon: <EmojiEventsIcon />,
                    text: "Certificate of completion",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Lessons:</h2>
              <div className="space-y-4">
                {courseData.lessons.map((lesson: any, index: number) => (
                  <div
                    key={index}
                    tabIndex={index}
                    className={`collapse collapse-arrow ${bgClasses} ${borderClasses} border rounded-lg`}>
                    <input type="checkbox" className="peer" />
                    <div
                      className={`collapse-title text-lg font-medium ${
                        theme === "light" ? "bg-gray-50" : "bg-gray-700"
                      } ${baseClasses}`}>
                      {`${index + 1}. ${lesson.title}`}
                    </div>
                    <div className="collapse-content p-4 space-y-4">
                      <ReactPlayer
                        url={lesson.video}
                        width="100%"
                        height="auto"
                        controls={true}
                        className="rounded-lg overflow-hidden"
                      />
                      <p className="text-gray-600 dark:text-gray-400">
                        {lesson.description}
                      </p>
                      <h4 className="font-semibold">Objectives:</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {lesson?.objectives.map(
                          (objective: string, idx: number) => (
                            <li key={idx} className="flex items-center">
                              <PlayArrowIcon
                                fontSize="small"
                                className="mr-2"
                              />
                              <span>{objective}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className={`lg:w-1/3 ${bgClasses} rounded-xl shadow-lg p-6`}>
            <div className="mb-6">
              <button
                className={`w-full py-3 px-6 ${
                  theme === "light"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white font-semibold rounded-lg transition duration-300`}
                onClick={() =>
                  navigate("/instructor/add-course", {
                    state: { data: courseData },
                  })
                }>
                Update Course
              </button>
            </div>

            <div className="mb-8 rounded-lg overflow-hidden">
              <ReactPlayer
                url={courseData.trial.video}
                width="100%"
                height="auto"
                controls={true}
              />
            </div>

            <div className="text-center mb-8">
              {courseData.pricing.type === "free" ? (
                <p className="text-green-500 text-3xl font-bold">FREE</p>
              ) : (
                <>
                  <p className="text-green-500 text-3xl font-bold flex items-center justify-center">
                    <CurrencyRupeeIcon /> {courseData.pricing.amount}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 line-through mt-2">
                    ${courseData?.pricing.amount} 50% off
                  </p>
                </>
              )}
            </div>

            <div
              className={`${bgClasses} ${borderClasses} border rounded-lg p-6 mb-6`}>
              <h2 className="text-xl font-bold mb-4">Includes</h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                {[
                  { icon: <VideocamIcon />, text: "Best on-demand video" },
                  {
                    icon: <CloudDownloadIcon />,
                    text: "Downloadable resources",
                  },
                  { icon: <ThumbUpAltIcon />, text: "Full lifetime access" },
                  { icon: <PhonelinkIcon />, text: "Access on mobile and TV" },
                  { icon: <AssignmentIcon />, text: "Assignments" },
                  { icon: <StyleIcon />, text: "Certificate of Completion" },
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`${bgClasses} ${borderClasses} border rounded-lg p-6`}>
              <h2 className="text-xl font-bold mb-4">Details</h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                {[
                  {
                    icon: <PeopleIcon />,
                    label: "Enrolled",
                    value: courseData.students,
                  },
                  {
                    icon: <AccessTimeIcon />,
                    label: "Duration",
                    value: `${courseData.duration} hours`,
                  },
                  {
                    icon: <LibraryBooksIcon />,
                    label: "Chapters",
                    value: courseData.lessons.length,
                  },
                  {
                    icon: <BoltIcon />,
                    label: "Level",
                    value: courseData.level,
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    {item.icon}
                    <span className="ml-2">
                      {item.label}: <strong>{item.value}</strong>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <LoadingPopUp isLoading={true} />
      )}
    </div>
  );
};

export default SingleCoursePage;
