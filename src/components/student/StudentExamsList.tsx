import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import { getExamResultsByUserIdAction } from "@/redux/store/actions/result";
import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useNavigate } from "react-router-dom";


export const StudentExamsList : React.FC = () => {
    const {data} = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch()
    const [exams, setExams] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        fetchAllResults()
    },[data])

    const fetchAllResults = async () => {
        if (data?._id) {
            const response = await dispatch(getExamResultsByUserIdAction(data?._id))
            console.log(response.payload.data,"user all resultss");
            setExams(response.payload.data)
        }
    }

    return (
        <>
    <div className="max-w-7xl mx-auto p-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">My Exams</h2>
      </div>

      {exams.length > 0 ? (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Si.No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Attempt Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {exams.map((exam: any,index) => (
                <tr key={exam._id} className=" hover:bg-gray-700" >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{index + 1} .</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{exam?.assessmentRef?.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 ">{exam.score} / 100</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{new Date(exam.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {exam.isPassed ? <span className="badge badge-success font-bold" > Passed </span> : <span className="badge badge-error font-bold" > Failed </span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {
                            !exam.isPassed ? 
                            <button className="btn btn-outline btn-accent btn-sm" onClick={()=>navigate('/student/enrollments')} > Try Again </button>
                            :
                            <button className="text-green-500" > <DoneAllIcon /> </button>
                        }
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
        </>
    )
}