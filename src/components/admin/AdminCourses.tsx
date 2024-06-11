import { useAppDispatch } from "@/hooks/hooks";
import { getAllCourseAction } from "@/redux/store/actions/course";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminCourses: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        fetchCourses();
    }, [dispatch]);

    const fetchCourses = async () => {
        const result = await dispatch(getAllCourseAction({ page: 1, limit: 10 }));
        if (getAllCourseAction.fulfilled.match(result)) {
            setCourses(result.payload.data);
            console.log("courses data", result.payload.data);
        } else {
            console.error("Failed to fetch courses:", result.payload);
        }
    };

    const handleClick = () => {
        navigate('/admin/add-course');
    };

    return (
        <div className="max-w-full mx-auto py-20 px-10">
            <div className="flex justify-between p-6 mb-5">
                <h2 className="text-4xl font-bold">Courses</h2>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Si. No</th>
                            <th scope="col" className="px-6 py-3">Course Name</th>
                            <th scope="col" className="px-6 py-3">Instructor</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((data, index) => (
                            <tr key={data._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
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
                                    {data.pricing.amount}
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={()=> navigate('/admin/single-course', {state:{data}})} className="btn font-medium btn-outline btn-accent btn-sm">Approve/Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
