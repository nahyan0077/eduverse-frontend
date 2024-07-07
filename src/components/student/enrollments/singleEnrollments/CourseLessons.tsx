import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { useLocation, useNavigate } from "react-router-dom";

const CourseLessons: React.FC<{ courseData: any }> = ({ courseData }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col space-y-4 p-10">
      <label htmlFor="lesson" className="ml-2 font-bold text-xl">
        Lessons:
      </label>
      {courseData.lessons.map((lesson: any, index: number) => (
        <div
          className="collapse collapse-arrow bg-gray-100 dark:bg-gray-800 mb-2"
          key={index}>
          <input type="checkbox" name="my-accordion-1" />
          <div className="collapse-title text-md flex font-medium">
            {index + 1 + ".  " + lesson.title}
          </div>
          <div className="collapse-content">
            <p className="text-sm p-4">{lesson.description}</p>
            <div className="ml-3">
              {lesson.objectives.map((obj: any, i: number) => (
                <ul className="text-sm text-gray-300" key={i}>
                  <li>
                    <ArrowForwardIcon color="primary" /> {obj}
                  </li>
                </ul>
              ))}
            </div>
            <div className="flex py-3 items-center">
              <button
                className="btn btn-outline btn-warning btn-sm ml-auto"
                onClick={() =>
                  navigate("/student/course-preview", {
                    state: {
                      courseData,
                      enrollmentId: location.state.enrollmentId,
                    },
                  })
                }>
                <OndemandVideoIcon color="warning" />
                Preview
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseLessons;
