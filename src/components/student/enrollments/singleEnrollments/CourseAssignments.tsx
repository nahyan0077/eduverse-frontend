import React from "react";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import DownloadIcon from "@mui/icons-material/Download";

const CourseAssignments: React.FC<{ courseData: any }> = ({ courseData }) => {
  return (
    <div className="flex flex-col space-y-4 p-10">
      <label htmlFor="lesson" className="ml-2 font-bold text-xl">
        Assignments:
      </label>
      <div className="bg-gray-800 rounded-xl flex flex-col lg:flex-row justify-between items-center p-4">
        <h1 className="flex items-center text-gray-300">
          <ReadMoreIcon className="mr-4" />
          <span>{courseData.attachments.title}</span>
        </h1>
        <a
          href={courseData.attachments.url}
          target="_blank"
          className="btn btn-outline btn-sm btn-accent self-end"
          download
        >
          Click to download <DownloadIcon className="ml-2" />
        </a>
      </div>
    </div>
  );
};

export default CourseAssignments;
