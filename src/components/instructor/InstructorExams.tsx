import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import { getAssessmentsByInstructorIdAction } from "@/redux/store/actions/assessment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { Player } from "@lottiefiles/react-lottie-player";

interface Exam {
  _id: string;
  title: string;
  courseId: any;
  totalScore: number;
  passingScore: number;
  createdAt: string;
}

export const InstructorExams: React.FC = () => {
  const { data } = useAppSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    fetchAllExams();
  }, [data]);

  const fetchAllExams = async () => {
    if (data?._id) {
      const response = await dispatch(getAssessmentsByInstructorIdAction(data._id));
      console.log(response.payload.data, "res data all exams");
      setExams(response.payload.data);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">My Exams</h2>
        <button 
          className="btn btn-primary btn-outline"
          onClick={() => navigate('/instructor/add-exam')}
        >
          Add New Exam
        </button>
      </div>

      {exams.length > 0 ? (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Course Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Passing Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {exams.map((exam) => (
                <tr key={exam._id} className=" hover:bg-gray-700" >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{exam.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{exam.courseId.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 ">{exam.totalScore}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{exam.passingScore}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {new Date(exam.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3" onClick={() => {/* View logic */}}>
                      <FaEye />
                    </button>
                    <button className="text-green-600 hover:text-green-900 mr-3" onClick={() => {navigate(`/instructor/add-exam?assessmentId=${exam._id}`)}}>
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => {/* Delete logic */}}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10 lg:pt-20 shadow-md rounded-lg">
                    <Player
            autoplay
            loop
            src="https://lottie.host/2a21cfdf-5523-444f-a483-a4673cd63c49/bKl0W0Zndb.json"
            style={{ height: "200px", width: "200px", margin: "0 auto" }}
          />
          <p className="text-gray-500 text-xl font-bold mt-3 dark:text-gray-400">No exams found. Create your first exam!</p>
        </div>
      )}
    </div>
  );
};