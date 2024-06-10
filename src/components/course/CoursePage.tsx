import { useAppDispatch } from "@/hooks/hooks";
import { getAllCourseAction } from "@/redux/store/actions/course";
import { CourseEntity } from "@/types/ICourse";
import React, { useEffect, useState } from "react";

export const CoursePage: React.FC = () => {
	const dispatch = useAppDispatch();
	const [courses, setCourses] = useState<CourseEntity[]>();

	useEffect(() => {
		fetchCourse();
	}, [dispatch]);

	const fetchCourse = async () => {
		const courses = await dispatch(getAllCourseAction({ page: 1, limit: 10 }));
        if (getAllCourseAction.fulfilled.match(courses)) {
            setCourses(courses.payload.data);
            console.log("user data", courses);
        } else {
            console.error("Failed to fetch courses:", courses.payload);
        }
	};

	return (
		<div className="max-w-full mx-auto py-10 px-4 lg:px-24">
			<div className="flex justify-between items-center mb-6">
				<div>
					<span className="text-lg font-medium">Showing 1-9 of 21 courses</span>
				</div>
				<div>
					<button className="btn btn-outline btn-primary">
						Newly published
					</button>
				</div>
			</div>
			<div className="flex space-x-5">
				<div className="w-1/4 pr-4 p-5 rounded-xl shadow-xl py-10">
					<div className="mb-6">
						<input
							type="text"
							placeholder="Search Course"
							className="input input-bordered w-full bg-gray-300"
						/>
					</div>
					<div className="mb-6">
						<h3 className="font-semibold mb-2">Course Categories</h3>
						<div className="flex flex-col space-y-2">
							<label>
								<input type="checkbox" className="mr-2" /> Angular
							</label>
							<label>
								<input type="checkbox" className="mr-2" /> Bootstrap
							</label>
							<label>
								<input type="checkbox" className="mr-2" /> CSS3
							</label>
							{/* Add more categories as needed */}
						</div>
					</div>
					<div className="mb-6">
						<h3 className="font-semibold mb-2">Level</h3>
						<div className="flex flex-col space-y-2">
							<label>
								<input type="checkbox" className="mr-2" /> Beginner
							</label>
							<label>
								<input type="checkbox" className="mr-2" /> Intermediate
							</label>
							<label>
								<input type="checkbox" className="mr-2" /> Expert
							</label>
						</div>
					</div>
					<div className="mb-6">
						<h3 className="font-semibold mb-2">Price</h3>
						<div className="flex flex-col space-y-2">
							<label>
								<input type="checkbox" className="mr-2" /> Free
							</label>
							<label>
								<input type="checkbox" className="mr-2" /> Paid
							</label>
						</div>
					</div>
				</div>
				<div className="w-[70%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{courses?.map((course) => (
						<div key={course._id} className="card  shadow-xl">
							<figure>
								<img
									src={course.thumbnail}
									alt={course.title}
									className="w-full h-48 object-cover"
								/>
							</figure>
							<div className="card-body fixed-height">
								<h2 className="card-title">{course.title}</h2>
								<p className="text-sm text-gray-500">
									Instructor: {course.instructor}
								</p>
								<p className="text-sm text-gray-500">
									Lessons: {course.lessons}
								</p>
								<p className="text-sm text-gray-500">
									Duration: {course.duration}
								</p>
								<p className="text-lg font-bold">
									{course.discountedPrice ? (
										<>
											<span className="line-through mr-2">{course.price}</span>
											<span className="text-red-500">
												{course.discountedPrice}
											</span>
										</>
									) : (
										course.price
									)}
								</p>
								<div className="flex justify-between items-center mt-4">
									<div>
										<span className="text-sm text-yellow-500">
											⭐ {course.rating}
										</span>
									</div>
									<button className="btn btn-primary btn-sm">Buy Now</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="flex justify-center mt-10">
				<div className="btn-group">
					<button className="btn">1</button>
					<button className="btn btn-outline">2</button>
					<button className="btn btn-outline">3</button>
				</div>
			</div>
		</div>
	);
};
