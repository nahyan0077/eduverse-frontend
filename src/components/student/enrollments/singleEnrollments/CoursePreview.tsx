import React from "react";
import ReactPlayer from "react-player";
import CourseDetails from "./CourseDetails";

const CoursePreview: React.FC<{ courseData: any }> = ({ courseData }) => {
  return (
    <div className="lg:w-full py-4 px-6 rounded-e-3xl rounded-s-md bg-white dark:bg-gray-900 shadow-lg">
        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Course Preview
        </span>
      <ReactPlayer
        width="100%"
        height="200px"
        url={courseData.trial.video}
        controls={true}
        className="overflow-hidden rounded-xl"
      />
    </div>
  );
};

export default CoursePreview;
