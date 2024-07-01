import React, { useEffect, useState } from "react";
import { useTheme } from "../ui/theme-provider";
import { getCoursesByInstructorIdAction } from "@/redux/store/actions/course";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import {
	FaGraduationCap,
	FaBook,
	FaRupeeSign,
	FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

const InstructorDashboard: React.FC = () => {
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const { data } = useAppSelector((state: RootState) => state.user);
	const [instructorCourses, setInstructorCourses] = useState<any[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchInstructorCourses();
	}, []);

	const fetchInstructorCourses = async () => {
		if (data?._id) {
			const response = await dispatch(
				getCoursesByInstructorIdAction(data?._id)
			);
			setInstructorCourses(response.payload.data);
		}
	};

	const totalCourses = instructorCourses.length;
	const studentsTaught = instructorCourses.reduce(
		(acc, course) => acc + course.studentsEnrolled,
		0
	);
	const totalEarnings = data?.profit;

	const topCourses = instructorCourses
		.sort((a, b) => b.studentsEnrolled - a.studentsEnrolled)
		.slice(0, 5);

	return (
		<div
			className={`flex-1 overflow-auto p-4 md:p-8 ${
				theme === "light" ? "bg-gray-100" : "bg-gray-950"
			}`}
		>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
				<StatBox
					title="Total Courses"
					value={totalCourses}
					icon={<FaBook />}
					theme={theme}
				/>
				<StatBox
					title="Students Taught"
					value={studentsTaught}
					icon={<FaGraduationCap />}
					theme={theme}
				/>
				<StatBox
					title="Total Earnings"
					value={totalEarnings}
					icon={<FaRupeeSign />}
					theme={theme}
				/>
			</div>

			<div className="mb-8">
				<div className="flex justify-between items-center mb-4">
					<h2
						className={`text-xl md:text-2xl font-semibold ${
							theme === "light" ? "text-gray-800" : "text-white"
						}`}
					>
						My Recent Courses
					</h2>
					<button
						className={` rounded-md transition duration-300 text-sm md:text-base btn btn-sm btn-outline btn-info`}
						onClick={() => navigate("/instructor/courses")}
					>
						View All Courses
					</button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
					{instructorCourses.slice(0, 4).map((course) => (
						<CourseCard key={course._id} course={course} theme={theme} />
					))}
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-6">
				<h2
					className={`text-xl md:text-2xl font-bold mb-4 ${
						theme === "light" ? "text-gray-800" : "text-white"
					}`}
				>
					Top 5 Enrollments
				</h2>
				<div className="overflow-x-auto">
					<table className="w-full text-sm text-left">
						<thead
							className={`text-xs uppercase ${
								theme === "light"
									? "bg-gray-200 text-gray-700"
									: "bg-gray-700 text-gray-300"
							}`}
						>
							<tr>
								<th scope="col" className="px-4 py-3 rounded-tl-lg">
									Si.No
								</th>
								<th scope="col" className="px-4 py-3">
									Thumbnail
								</th>
								<th scope="col" className="px-4 py-3">
									Course Name
								</th>
								<th scope="col" className="px-4 py-3">
									Total Enrollments
								</th>
								<th scope="col" className="px-4 py-3 rounded-tr-lg">
									Price
								</th>
							</tr>
						</thead>
						<tbody>
							{topCourses.map((course, index) => (
								<tr
									key={course._id}
									className={`${
										theme === "light"
											? "bg-white border-b"
											: "bg-gray-800 border-gray-700"
									} hover:bg-gray-50 dark:hover:bg-gray-600`}
								>
									<td className="px-4 py-3">{index + 1}</td>
									<td className="px-4 py-3">
										<img
											className="w-16 h-10 rounded-md"
											src={course?.thumbnail}
											alt={course?.title}
										/>
									</td>
									<td className="px-4 py-3 font-medium">{course.title}</td>
									<td className="px-4 py-3">{course.studentsEnrolled}</td>
									<td className="px-4 py-3">
										{course.pricing?.amount ?? "Free"}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

const StatBox: React.FC<{
	title: string;
	value: number | string | undefined;
	icon: React.ReactNode;
	theme: string;
}> = ({ title, value, icon, theme }) => (
	<div
		className={`rounded-lg p-4 md:p-6 shadow-lg flex items-center ${
			theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"
		}`}
	>
		<div
			className={`text-2xl md:text-3xl mr-4 ${
				theme === "light" ? "text-blue-600" : "text-blue-400"
			}`}
		>
			{icon}
		</div>
		<div>
			<h2
				className={`text-sm md:text-lg font-semibold mb-1 ${
					theme === "light" ? "text-gray-700" : "text-gray-300"
				}`}
			>
				{title}
			</h2>
			<p className="text-xl md:text-3xl font-bold">{value}</p>
		</div>
	</div>
);

const CourseCard: React.FC<{ course: any; theme: string }> = ({
	course,
	theme,
}) => {
	const navigate = useNavigate();

	return (
		<div
			className={`rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 ${
				theme === "light" ? "bg-white" : "bg-gray-800"
			}`}
		>
			<div className="flex flex-col sm:flex-row">
				<div className="sm:w-1/3">
					<img
						src={course.thumbnail || "https://via.placeholder.com/150"}
						alt={course.title}
						className="w-full h-32 sm:h-full object-cover"
					/>
				</div>
				<div className="sm:w-2/3 p-4">
					<h3
						className={`text-lg font-semibold mb-2 ${
							theme === "light" ? "text-gray-800" : "text-white"
						}`}
					>
						{course.title}
					</h3>
					<div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
						<AcademicCapIcon className="h-5 w-5 mr-2" />
						<span>{course.level}</span>
					</div>

					<button
						className={`btn btn-sm btn-outline btn-accent rounded text-sm font-medium flex items-center justify-center `}
						onClick={() => navigate("/instructor/courses")}
					>
						View Details
						<FaChevronRight className="ml-2" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default InstructorDashboard;
