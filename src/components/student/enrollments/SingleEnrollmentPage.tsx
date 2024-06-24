import React, { useEffect, useState } from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PeopleIcon from "@mui/icons-material/People";
import StyleIcon from "@mui/icons-material/Style";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import PhonelinkIcon from "@mui/icons-material/Phonelink";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import VideocamIcon from "@mui/icons-material/Videocam";
import { useLocation, useNavigate } from "react-router-dom";
import CodeIcon from "@mui/icons-material/Code";
import ArticleIcon from "@mui/icons-material/Article";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useTheme } from "@/components/ui/theme-provider";
import LoadingPopUp from "@/components/common/skeleton/LoadingPopUp";
import { CurrencyRupee as CurrencyRupeeIcon } from "@mui/icons-material";
import { Toaster, toast } from "sonner";
import banner from "@/assets/course/banner1.jpg";
import { useAppDispatch } from "@/hooks/hooks";
import { CourseReview } from "./CourseReview";
import { getCourseByIdAction } from "@/redux/store/actions/course";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

export const SingleEnrollmentPage: React.FC = () => {
	const [courseData, setCourseData] = useState<any>(null);
	const location = useLocation();
	const { theme } = useTheme();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchData();
	}, [location.state]);

	const fetchData = async () => {
		setLoading(true);
		const response = await dispatch(
			getCourseByIdAction(location.state.courseId)
		);
		setCourseData(response.payload.data);
		setLoading(false);
	};

	if (loading) {
		return <LoadingPopUp isLoading={true} />;
	}

	const handleReviewSubmit = (review: string) => {
		console.log(review,"review text");
		
	}

	return (
		<>
			<div className="relative w-full h-[15vh] md:h-[30vh] ">
				<img src={banner} className="" alt="Course Banner" />
			</div>
			<div
				className={`relative min-h-screen max-w-7xl mx-auto mb-10  ${
					theme === "light" ? "text-gray-900" : "text-gray-100 mb-5"
				}`}
			>
				<Toaster richColors position="top-center" />
				{courseData ? (
					<div
						className={`relative flex flex-col lg:flex-row rounded-3xl overflow-hidden space-y-5 lg:space-y-0 lg:space-x-5 -mt-20 p-4  ${
							theme === "dark"
								? "bg-slate-800"
								: "bg-gradient-to-r from-fuchsia-50 to-violet-100"
						} `}
					>
						{/* Left Section */}
						<div className="lg:w-2/3 rounded-xl bg-white dark:bg-gray-900 ">
							<div className="mb-4 bg-violet-200 dark:bg-gray-950 rounded-t-3xl p-6">
								<div className="flex items-center mb-2 ">
									<img
										src={courseData.instructorRef.profile.avatar}
										alt="Instructor"
										className="object-cover w-10 h-10 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500 mr-3 ml-1"
									/>
									<div>
										<h2 className="text-lg font-bold">
											{courseData.instructorRef.firstName}{" "}
											{courseData.instructorRef.lastName}
										</h2>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											Instructor
										</p>
									</div>
								</div>
								<h1 className="text-2xl font-bold mb-2">{courseData.title}</h1>
								<div className="flex items-center flex-wrap">
									<span className="text-yellow-500">★★★★☆</span>
									<span className="ml-2 text-gray-600 dark:text-gray-400">
										(15)
									</span>
									<span className="ml-4 text-gray-600 dark:text-gray-400">
										<LibraryBooksIcon color="warning" fontSize="small" />{" "}
										{courseData.lessons.length} Lessons
									</span>
									<span className="ml-4 text-gray-600 dark:text-gray-400">
										<AccessTimeIcon color="warning" fontSize="small" />{" "}
										{courseData.duration} hours
									</span>
									<span className="ml-4 text-gray-600 dark:text-gray-400">
										<BoltIcon color="warning" fontSize="small" />{" "}
										{courseData.level}
									</span>
								</div>
							</div>

							<div className="shadow-md px-10 py-6 mb-6 space-y-12">
								<div className="mb-4">
									<h3 className="text-lg font-bold mb-2">Overview</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										{courseData.description}
									</p>
								</div>

								<div className="mb-4">
									<h3 className="text-lg font-bold mb-2">What you'll learn</h3>
									<ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
										{courseData.lessons.map((lesson: any, index: number) => (
											<li key={index}>{lesson.title}</li>
										))}
									</ul>
								</div>
							</div>

							<div className="rounded-lg shadow-md p-10 mb-6">
								<h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
									This course includes:
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
									<div className="flex items-center">
										<VideocamIcon className="mr-2" />
										<span>Content on-demand video</span>
									</div>
									<div className="flex items-center">
										<CodeIcon className="mr-2" />
										<span>Coding exercises</span>
									</div>
									<div className="flex items-center">
										<ArticleIcon className="mr-2" />
										<span>Quality articles</span>
									</div>
									<div className="flex items-center">
										<CloudDownloadIcon className="mr-2" />
										<span>Downloadable resources</span>
									</div>
									<div className="flex items-center">
										<PhonelinkIcon className="mr-2" />
										<span>Access on mobile and TV</span>
									</div>
									<div className="flex items-center">
										<EmojiEventsIcon className="mr-2" />
										<span>Certificate of completion</span>
									</div>
								</div>
							</div>

							<div className="flex flex-col space-y-4 p-10">
								<label htmlFor="lesson" className="ml-2 font-bold text-xl">
									Lessons:
								</label>
								{courseData.lessons.map((lesson: any, index: number) => (
									<div
										className="collapse collapse-arrow bg-gray-100 dark:bg-gray-800 mb-2"
										key={index}
									>
										<input type="checkbox" name="my-accordion-1" />
										<div className="collapse-title text-md flex font-medium">
											{index + 1 + ".  " + lesson.title}
										</div>
										<div className="collapse-content">
											<p className="text-sm p-4"> {lesson.description}</p>
											<div className="ml-3">
												{lesson.objectives.map((obj: any) => {
													return (
														<ul className="text-sm text-gray-300">
															<li>
																{" "}
																<ArrowForwardIcon color="primary" /> {obj}{" "}
															</li>
														</ul>
													);
												})}
											</div>
											<div className="flex py-3 items-center">
												<button
													className="btn btn-outline btn-warning btn-sm ml-auto"
													onClick={() =>
														navigate("/student/course-preview", {
															state: {
																courseData,
																enrollmentId: location.state.enrollmentId,
															},
														})
													}
												>
													<OndemandVideoIcon color="warning" />
													Preview
												</button>
											</div>
										</div>
									</div>
								))}
							</div>

							<div className="flex flex-col space-y-4 p-10">
								<label htmlFor="lesson" className="ml-2 font-bold text-xl">
									Assignments:
								</label>
								<div className="bg-gray-800 rounded-xl flex flex-col lg:flex-row justify-between items-center p-4">
									<h1 className="flex items-center text-gray-300">
										<ReadMoreIcon className="mr-4" />
										<span>{courseData.attachments.title}</span>
									</h1>
									<a
										href={courseData.attachments.url}
										target="_blank"
										className="btn btn-outline btn-sm btn-accent self-end"
										download
									>
										Click to download <DownloadIcon className="ml-2" />
									</a>
								</div>
							</div>

							<CourseReview handleSubmit={handleReviewSubmit} />
						</div>

						{/* Right Section */}
						<div className="lg:w-1/3 py-4 px-6 rounded-e-3xl rounded-s-md bg-white dark:bg-gray-900 shadow-lg">
							{/* Video/Image Section */}
							<div className="relative pb-56 mb-4 overflow-hidden rounded-lg">
								<iframe
									src={courseData.trial.video}
									className="absolute h-full w-full object-cover"
									title="Course Video"
								/>
							</div>
							{/* Course Info */}
							<div className="text-center mb-4">
								{courseData.pricing.type === "free" ? (
									<p className="text-green-500 text-2xl font-bold mb-2">FREE</p>
								) : (
									<>
										<p className="text-green-500 text-2xl font-bold mb-2">
											<CurrencyRupeeIcon /> {courseData.pricing.amount}
										</p>
										<p className="text-gray-600 dark:text-gray-400 line-through mb-2">
											${courseData.pricing.amount} 50% off
										</p>
									</>
								)}
							</div>
							<div className="p-4">
								<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
									<h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
										Includes
									</h2>
									<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
										<li className="flex items-center">
											<VideocamIcon className="mr-2" />
											<span>Best on-demand video</span>
										</li>
										<li className="flex items-center">
											<CloudDownloadIcon className="mr-2" />
											<span>Downloadable resources</span>
										</li>
										<li className="flex items-center">
											<ThumbUpAltIcon className="mr-2" />
											<span>Full lifetime access</span>
										</li>
										<li className="flex items-center">
											<PhonelinkIcon className="mr-2" />
											<span>Access on mobile and TV</span>
										</li>
										<li className="flex items-center">
											<AssignmentIcon className="mr-2" />
											<span>Assignments</span>
										</li>
										<li className="flex items-center">
											<StyleIcon className="mr-2" />
											<span>Certificate of Completion</span>
										</li>
									</ul>
								</div>

								<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
									<h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
										Details
									</h2>
									<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
										<li className="flex items-center">
											<PeopleIcon className="mr-2" />
											<span>
												Enrolled: <strong>{courseData.students}</strong>
											</span>
										</li>
										<li className="flex items-center">
											<AccessTimeIcon className="mr-2" />
											<span>
												Duration: <strong>{courseData.duration} hours</strong>
											</span>
										</li>
										<li className="flex items-center">
											<LibraryBooksIcon className="mr-2" />
											<span>
												Chapters: <strong>{courseData.lessons.length}</strong>
											</span>
										</li>
										<li className="flex items-center">
											<BoltIcon className="mr-2" />
											<span>
												Level: <strong>{courseData.level}</strong>
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				) : (
					<LoadingPopUp isLoading={true} />
				)}
			</div>
		</>
	);
};
