import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { getAllCourseAction } from "@/redux/store/actions/course";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CourseEntity, Lesson } from "@/types/ICourse";

const formatDuration = (seconds: number): string => {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = Math.floor(seconds % 60);

	let result = "";

	if (h > 0) {
		result += `${h}hr${h > 1 ? "s" : ""} `;
	}
	if (m > 0) {
		result += `${m}min${m > 1 ? "s" : ""} `;
	}
	if (s > 0 || (h === 0 && m === 0)) {
		result += `${s}sec${s > 1 ? "s" : ""}`;
	}

	return result.trim();
};

export const InstructorCourses: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [courseData, setCourseData] = useState<any[]>([]);

	const { data } = useSelector((state: RootState) => state.user);

	console.log(data, "data instsructor");

	useEffect(() => {
		const fetchCourses = async () => {
			const result = await dispatch(getAllCourseAction({ page: 1, limit: 10 }));
			if (getAllCourseAction.fulfilled.match(result)) {
				setCourseData(result.payload.data);
				console.log("course data---->", courseData);
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
		return course.instructorRef._id == data?._id;
	});

	const calculateTotalDuration = (lessons: Lesson[]) => {
		return lessons
			.filter((lesson) => lesson.duration !== undefined)
			.reduce((total, lesson) => total + parseFloat(lesson.duration!), 0);
	};

	return (
		<div className="max-w-7xl mx-auto py-20">
			<div className="flex justify-between p-6 mb-5">
				<h2 className="text-4xl font-bold">Courses</h2>
				<button className="btn btn-outline btn-warning" onClick={handleClick}>
					Add Course
				</button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{instructorCourse.map((course: CourseEntity) => {
					const totalDurationSeconds = calculateTotalDuration(
						course.lessons ?? []
					);
					const formattedDuration = formatDuration(totalDurationSeconds);

					return (
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
								<div className="flex items-center justify-between pt-5 ">
									{(course.isPublished && (
										<button className="badge badge-success"> Approved </button>
									)) ||
										(!course.isPublished && !course.isRejected && (
											<button className="badge badge-warning"> Pending </button>
										)) ||
										(course.isRejected && (
											<button className="badge badge-error"> Rejected </button>
										))}
									<button
										className="btn btn-primary btn-outline "
										onClick={() =>
											navigate("/instructor/single-course", {
												state: {
													course: { ...course, duration: formattedDuration },
												},
											})
										}
									>
										{" "}
										View{" "}
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
