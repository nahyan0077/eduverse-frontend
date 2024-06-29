import React from "react";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DangerousIcon from "@mui/icons-material/Dangerous";
import PendingIcon from "@mui/icons-material/Pending";
import ChecklistIcon from "@mui/icons-material/Checklist";
import HelpIcon from "@mui/icons-material/Help";
import { Course } from "../AdminCourses";

interface CourseTableProps {
  courses: Course[];
  handleModalOpen: (course: Course) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({ courses }) => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-900 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Si. No</th>
            <th scope="col" className="px-6 py-3">Course Name</th>
            <th scope="col" className="px-6 py-3">Instructor</th>
            <th scope="col" className="px-6 py-3">Category</th>
            <th scope="col" className="px-6 py-3">Verification</th>
            <th scope="col" className="px-6 py-3">Request Status</th>
            <th scope="col" className="px-6 py-3">Price</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((data, index) => (
            <tr
              key={data._id}
              onClick={() => navigate("/admin/single-course", { state: { data } })}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
              </th>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.title}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.instructorRef.firstName}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.categoryRef.categoryName}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.isBlocked ? (
                  <span><CheckCircleIcon color="error" /> Blocked</span>
                ) : data.isRequested ? (
                  <span><HelpIcon color="primary" /> Requested</span>
                ) : data.isPublished ? (
                  <span><CheckCircleIcon color="success" /> Published</span>
                ) : (
                  <span><DangerousIcon color="error" /> Rejected</span>
                )}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.isRequested ? (
                  <span><PendingIcon color="warning" /> Pending</span>
                ) : (
                  <span><ChecklistIcon color="success" /> Verified</span>
                )}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.pricing.type === "free" ? "Free" : data.pricing.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
