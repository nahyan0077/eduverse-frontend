import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
	UpdateLessonProgressAction,
	getEnrollmentByIdAction,
} from "@/redux/store/actions/enrollment";
import { EnrollmentEntity } from "@/types/IEnrollment";
import { unwrapResult } from "@reduxjs/toolkit";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import PendingIcon from "@mui/icons-material/Pending";
import { RootState } from "@/redux/store";
import { generateCertificate } from "@/redux/store/actions/course/generateCertificate";
import DownloadIcon from "@mui/icons-material/Download";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { getAssessmentsByCourseIdAction } from "@/redux/store/actions/assessment";
import { useTheme } from "../../ui/theme-provider";
import { motion } from "framer-motion";
import { Watch } from "react-loader-spinner";

export const CoursePreview: React.FC = () => {
	const location = useLocation();
	const courseData = location.state.courseData;
	const enrollmentId: string = location.state.enrollmentId;
	const [previewVideo, setPreviewVideo] = useState(courseData?.trial?.video);
	const [progress, setProgress] = useState<{ [key: string]: number }>({});
	const [completed, setCompleted] = useState<{ [key: string]: boolean }>({});
	const [enrollment, setEnrollment] = useState<EnrollmentEntity | null>(null);
	const dispatch = useAppDispatch();
	const { data } = useAppSelector((state: RootState) => state.user);
	const [examData, setExamData] = useState<any | null>(null);
	const navigate = useNavigate();
	const [isModalVisible, setModalVisible] = useState(false);
	const { theme } = useTheme();

	useEffect(() => {
		fetchEnrollment();
		fetchExams();
	}, [courseData]);

	const totalLessons: number = courseData.lessons.length;

	const fetchEnrollment = async () => {
		try {
			const result = await dispatch(getEnrollmentByIdAction(enrollmentId));
			const enrollmentData = unwrapResult(result);
			setEnrollment(enrollmentData.data);
			initializeProgress(enrollmentData.data);
            console.log(progress,"test");
            
		} catch (error) {
			console.error("Failed to fetch enrollment:", error);
		}
	};

	const initializeProgress = (enrollmentData: EnrollmentEntity) => {
		if (enrollmentData.progress?.completedLessons) {
			const completedLessons = enrollmentData.progress.completedLessons.reduce(
				(acc, lessonId) => {
					acc[lessonId] = true;
					return acc;
				},
				{} as { [key: string]: boolean }
			);

			setCompleted(completedLessons);
		}
	};

	const handleProgress = async (played: number, lessonId: string) => {
		setProgress((prev) => ({ ...prev, [lessonId]: played }));

		if (played >= 0.7 && !completed[lessonId]) {
			setCompleted((prev) => ({ ...prev, [lessonId]: true }));

			const response = await dispatch(
				UpdateLessonProgressAction({
					enrollmentId,
					lessonId,
					totalLessons,
				})
			);

			console.log("Updated lesson progress:", response);
		}
	};

	const handleCertificateGenerate = async () => {
		const newData = {
			courseId: courseData._id,
			userId: data?._id,
		};
		const response = await dispatch(generateCertificate(newData));
		console.log(response, "pdf download");
	};

	const fetchExams = async () => {
		try {
			const response = await dispatch(
				getAssessmentsByCourseIdAction(courseData._id)
			);
			if (response.payload.data.length > 0) {
				setExamData(response.payload.data[0]); // Assuming there's only one exam
				console.log(response.payload.data[0], "exam data");
			}
		} catch (error) {
			console.error("Failed to fetch exams:", error);
		}
	};

	const allLessonsCompleted = courseData.lessons.every(
		(lesson: any) => completed[lesson._id]
	);

	return (
		<>
			{isModalVisible && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 ">
					<motion.div
						className={`w-full max-w-xl py-8 px-12 rounded-lg shadow-xl ${
							theme === "light"
								? "bg-white text-gray-800"
								: "bg-gray-900 text-white outline outline-blue-900 outline-2"
						}`}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex flex-col items-center space-y-6">
							<h2 className="text-2xl font-bold text-center">
								{examData.title}
							</h2>

							<div className="w-20 h-20 rounded-full  flex items-center justify-center">
								<Watch
									visible={true}
									height="80"
									width="80"
									radius="48"
									color={theme === "light" ? "#3B82F6" : "#60A5FA"}
									ariaLabel="watch-loading"
								/>
							</div>

							<div className="text-center">
								<p className="text-xl font-semibold">Time Limit: 5 minutes</p>
								<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
									Complete the exam within the allocated time to earn your
									certificate.
								</p>
							</div>

							<div className="space-y-4 w-full ml-40">
								<ul className="text-sm">
									<li className="flex items-center mb-2">
										<svg
											className="w-4 h-4 mr-2 text-green-500"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"
											/>
										</svg>
										Carefully read each question before answering
									</li>
									<li className="flex items-center mb-2">
										<svg
											className="w-4 h-4 mr-2 text-green-500"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"
											/>
										</svg>
										Don't close window without completing the exam
									</li>
									<li className="flex items-center">
										<svg
											className="w-4 h-4 mr-2 text-green-500"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"
											/>
										</svg>
										Ensure a stable internet connection
									</li>
								</ul>
							</div>

							<div className="flex justify-between w-full">
								<button
									className="btn btn-outline btn-sm btn-error"
									onClick={() => setModalVisible(false)}
								>
									Cancel
								</button>
								<button
									className="btn  btn-sm btn-success"
									onClick={() =>
										navigate(`/student/exam/?examId=${examData._id}`)
									}
								>
									Start Exam
								</button>
							</div>
						</div>
					</motion.div>
				</div>
			)}
			<div className="min-h-screen text-gray-900 dark:text-gray-100 py-8">
				<div className="container mx-auto px-4">
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
						<div className="flex justify-between items-center">
							<h1 className="text-3xl font-bold">{courseData?.title}</h1>
							{enrollment?.completionStatus === "completed" ? (
								<span className="text-green-500 font-semibold flex items-center">
									<BeenhereIcon className="mr-2" />
									COMPLETED
								</span>
							) : (
								<span className="text-orange-500 font-semibold flex items-center">
									<PendingIcon className="mr-2" />
									IN-PROGRESS
								</span>
							)}
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2">
							<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
								<ReactPlayer
									url={previewVideo}
									width="100%"
									height="480px"
									controls={true}
									className="rounded-lg overflow-hidden"
									onProgress={({ played }) => {
										const currentLesson = courseData.lessons.find(
											(lesson: any) => lesson.video === previewVideo
										);
										if (currentLesson) {
											handleProgress(played, currentLesson._id);
										}
									}}
								/>
							</div>
						</div>

						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
							<h2 className="text-2xl font-bold mb-6">Course Content</h2>
							<div className="space-y-4">
								{courseData?.lessons.map((lesson: any) => (
									<div
										key={lesson.lessonNumber}
										className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
									>
										<div
											className="flex items-center justify-between cursor-pointer py-2"
											onClick={() => setPreviewVideo(lesson.video)}
										>
											<div className="flex items-center">
												<PlayCircleOutlineIcon className="text-blue-500 mr-2" />
												<span className="font-medium">
													{lesson.lessonNumber}. {lesson.title}
												</span>
											</div>
											{completed[lesson._id] && (
												<BeenhereIcon className="text-green-500" />
											)}
										</div>
										<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
											{lesson.description}
										</p>
									</div>
								))}
							</div>

							{examData && allLessonsCompleted && (
								<div>
									<button
										className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
										onClick={() => setModalVisible(true)}
									>
										<PlayCircleOutlineIcon className="mr-2" /> Start Exam
									</button>
									<p className="text-center italic text-sm p-2 ">
										{" "}
										Complete the exam to earn your certificate
									</p>
								</div>
							)}

							{allLessonsCompleted && !examData && (
                                <div className="flex justify-center mt-10" >

                                    <button
                                        className="btn btn-outline btn-success"
                                        onClick={handleCertificateGenerate}
                                    >
                                        <DownloadIcon className="mr-2" /> Download Certificate
                                    </button>
                                </div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
