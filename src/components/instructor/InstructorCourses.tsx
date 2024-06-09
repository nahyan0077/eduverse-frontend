import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { getAllCourseAction } from "@/redux/store/actions/course";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CourseEntity } from "@/types/ICourse";

export const InstructorCourses: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [courseData, setCourseData] = useState<CourseEntity[]>([]);

	const { data } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		const fetchCourses = async () => {
			const result = await dispatch(getAllCourseAction({ page: 1, limit: 10 }));
			if (getAllCourseAction.fulfilled.match(result)) {
				setCourseData(result.payload.data);
				console.log("user data", courseData);
			} else {
				console.error("Failed to fetch courses:", result.payload);
			}
		};

		fetchCourses();
	}, [dispatch]);

	const handleClick = () => {
		navigate("/instructor/add-course");
	};

	const instructorCourse = courseData.filter((course) => {
		return course.instructorRef == data?._id;
	});

	return (
		<div className="max-w-7xl mx-auto py-20">
			<div className="flex justify-between p-6 mb-5">
				<h2 className="text-4xl font-bold">Courses</h2>
				<button className="btn btn-outline btn-warning" onClick={handleClick}>
					Add Course
				</button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{instructorCourse.map((course: CourseEntity) => (
					<div
						key={course._id}
						className="card card-compact w-80 bg-base-100 shadow-xl"
					>
						<figure>
							<img
								src={
									course.thumbnail ||
									"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
								}
								alt={course.title}
							/>
						</figure>
						<div className="card-body">
							<h2 className="card-title">{course.title}</h2>
							<p>{course.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
