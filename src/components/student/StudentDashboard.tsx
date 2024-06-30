import React, { useEffect, useState } from "react";
import { useTheme } from "../ui/theme-provider";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getEnrollmentByUserIdAction } from "@/redux/store/actions/enrollment";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";

const StudentDashboard: React.FC = () => {
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { data } = useAppSelector((state: RootState) => state.user);
	const [completedCourses, setCompletedCourses] = useState<any[]>([]);
	const [ongoingCourses, setOngoingCourses] = useState<any[]>([]);
	const [totalCourses, setTotalCourses] = useState<any[]>([]);

	useEffect(() => {
		fetchCoursesEnrolled();
	}, []);

	const fetchCoursesEnrolled = async () => {
		if (data?._id) {
			const response = await dispatch(getEnrollmentByUserIdAction(data?._id));
			const enrollments = response.payload.data;

			const completed = enrollments.filter(
				(course: any) => course.progress.overallCompletionPercentage === 100
			);
			const ongoing = enrollments.filter(
				(course: any) => course.progress.overallCompletionPercentage < 100
			);

			setCompletedCourses(completed);
			setOngoingCourses(ongoing);
			setTotalCourses(enrollments);
		}
	};

	return (
		<div className="flex-1 overflow-auto p-6">
			<h1
				className={`text-3xl font-bold mb-6 ${
					theme === "light" ? "text-gray-800" : "text-white"
				}`}
			>
				Student Dashboard
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
				<StatBox
					title="Completed Courses"
					value={completedCourses.length}
					theme={theme}
				/>
				<StatBox
					title="Ongoing Courses"
					value={ongoingCourses.length}
					theme={theme}
				/>
				<StatBox
					title="Total Enrolled Courses"
					value={totalCourses.length}
					theme={theme}
				/>
			</div>

			<div className="mb-6 flex justify-between items-center">
				<h2
					className={`text-2xl font-semibold ${
						theme === "light" ? "text-gray-800" : "text-white"
					}`}
				>
					My Enrollments
				</h2>
				<button
					onClick={() => navigate("/student/enrollments")}
					className="btn btn-outline btn-sm transition duration-300"
				>
					View All
				</button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{totalCourses.slice(0, 2).map((course: any) => (
					<CourseCard key={course._id} course={course} theme={theme} />
				))}
			</div>
		</div>
	);
};

const StatBox: React.FC<{ title: string; value: number; theme: string }> = ({
	title,
	value,
	theme,
}) => (
	<div
		className={`rounded-lg p-6 shadow-lg transform transition-transform duration-300 hover:scale-105 ${
			theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-white"
		}`}
	>
		<h2
			className={`text-lg font-semibold mb-2 ${
				theme === "light" ? "text-gray-700" : "text-gray-300"
			}`}
		>
			{title}
		</h2>
		<p className="text-3xl font-bold">{value}</p>
	</div>
);

const CourseCard: React.FC<{ course: any; theme: string }> = ({
	course,
	theme,
}) => (
	<div
		className={`rounded-lg shadow-lg overflow-hidden ${
			theme === "light" ? "bg-white" : "bg-gray-800"
		}`}
	>
		<div className="flex">
			<div className="w-1/3">
				<img
					src={course.courseId.thumbnail || "https://via.placeholder.com/150"}
					alt={course.courseId.title}
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="w-2/3 p-4">
				<h3
					className={`text-lg font-semibold mb-2 ${
						theme === "light" ? "text-gray-800" : "text-white"
					}`}
				>
					{course.courseId.title}
				</h3>
				<p
					className={`text-sm mb-2 ${
						theme === "light" ? "text-gray-600" : "text-gray-300"
					}`}
				>
					Enrolled: {new Date(course.enrolledAt).toLocaleDateString()}
				</p>
				<div className="flex items-center justify-between">
					<p
						className={`text-sm ${
							theme === "light" ? "text-gray-600" : "text-gray-300"
						}`}
					>
						Completion:
					</p>
					<div
						className="radial-progress text-blue-600"
						style={
							{
								"--value": course.progress.overallCompletionPercentage,
								"--size": "3rem",
							} as React.CSSProperties
						}
						role="progressbar"
					>
						{course.progress.overallCompletionPercentage}%
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default StudentDashboard;
