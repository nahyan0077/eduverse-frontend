import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { CurrencyRupee as CurrencyRupeeIcon } from "@mui/icons-material";
import { Lesson } from "@/types/ICourse";

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

const calculateTotalDuration = (lessons: Lesson[]) => {
	return lessons
		.filter((lesson) => lesson.duration !== undefined)
		.reduce((total, lesson) => total + parseFloat(lesson.duration!), 0);
};

const CourseCard: React.FC<{ course: any }> = ({ course }) => {
	const navigate = useNavigate();
	const totalDurationSeconds = calculateTotalDuration(course.lessons ?? []);
	const formattedDuration = formatDuration(totalDurationSeconds);

	return (
		<motion.div
			className="card shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden border dark:border-violet-900 border-violet-300 max-w-xs h-full"
			whileHover={{ scale: 1.02 }}
			onClick={() =>
				navigate("/single-course", {
					state: {
						course: { ...course, duration: formattedDuration },
					},
				})
			}
		>
			<figure className="relative">
				<motion.img
					src={course.thumbnail}
					alt={course.title}
					className="w-full h-48 object-cover"
					whileHover={{ scale: 1.1 }}
				/>
			</figure>
			<div className="card-body p-4 max-h-96">
				<h2 className="card-title text-lg font-semibold mb-2">{course.title}</h2>
				<p className="text-sm text-gray-500 flex items-center mb-2">
					<div className="avatar mr-2">
						<div className="w-6 rounded-full">
							<img src={course.instructorRef.profile.avatar} alt="Instructor" />
						</div>
					</div>
					Instructor: {course?.instructorRef?.firstName}
				</p>
				<p className="text-sm text-gray-500 flex items-center mb-2">
					<AutoStoriesIcon color="secondary" fontSize="small" className="mr-1" />
					Lessons: <span className="font-bold ml-1">{course.lessons?.length}</span>
				</p>
				<p className="text-sm text-gray-500 flex items-center mb-2">
					<AccessTimeIcon color="warning" fontSize="small" className="mr-1" />
					Duration: <span className="font-bold ml-1">{formattedDuration}</span>
				</p>
				<p className="text-lg font-bold text-gray-800 mb-2">
					{course.pricing?.type === "paid" ? (
						<>
							<span className="line-through mr-2">{course.pricing.discountedAmount}</span>
							<span className="text-red-500">
								<CurrencyRupeeIcon fontSize="small" /> {course.pricing.amount}
							</span>
						</>
					) : (
						<span className="text-green-500"> Free </span>
					)}
				</p>
				<div className="flex justify-between items-center mt-1">
					<div>
						{course.level === "beginner" && (
							<span className="text-sm text-green-500">⭐ {course.level}</span>
						)}
						{course.level === "intermediate" && (
							<span className="text-sm text-yellow-500">⭐ {course.level}</span>
						)}
						{course.level === "expert" && (
							<span className="text-sm text-red-500">⭐ {course.level}</span>
						)}
					</div>
					<button className="btn btn-primary btn-outline btn-sm">Enroll Now</button>
				</div>
			</div>
		</motion.div>
	);
};

export default CourseCard;
