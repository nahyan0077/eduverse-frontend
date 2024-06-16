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
import { useTheme } from "../../ui/theme-provider";
import LoadingPopUp from "../../common/skeleton/LoadingPopUp";
import { CurrencyRupee as CurrencyRupeeIcon } from "@mui/icons-material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export const SingleCoursePage: React.FC = () => {
	const [courseData, setCourseData] = useState<any>(null);
	const location = useLocation();
	const { theme } = useTheme();
	const navigate = useNavigate()

	useEffect(() => {
		if (location.state.course) {
			setCourseData(location.state.course);
			console.log(location.state.course, "single product data");
		}
	}, [location.state]);

	return (
		<div
			className={`min-h-screen max-w-full mx-auto p-10 ${
				theme === "light" ? " text-gray-900" : " text-gray-100 mb-5"
			}`}
		>
			{courseData ? (
				<div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden space-y-5 lg:space-y-0 lg:space-x-5">
					{/* Left Section */}
					<div className="lg:w-2/3 p-10 rounded-xl">
						<div className="mb-4">
							<div className="flex items-center mb-2">
								<img
									src={courseData?.thumbnail}
									alt="Instructor"
									className="w-10 h-10 rounded-full mr-2"
								/>
								<div>
									<h2 className="text-lg font-bold">
										{courseData.instructorRef.firstName}
									</h2>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Instructor
									</p>
								</div>
							</div>
							<h1 className="text-2xl font-bold mb-2">{courseData?.title}</h1>
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

						<div className="shadow-md p-4 mb-6">
							<div className="mb-4">
								<h3 className="text-lg font-bold mb-2">Overview</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{courseData?.description}
								</p>
							</div>

							<div className="mb-4">
								<h3 className="text-lg font-bold mb-2">What you'll learn</h3>
								<ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
									<li>Become a UX designer.</li>
									<li>You will be able to add UX designer to your CV</li>
									<li>Become a UI designer.</li>
									<li>Build & test a full website design.</li>
								</ul>
							</div>
						</div>

						<div className="rounded-lg shadow-md p-6 mb-6">
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
									<span>65 articles</span>
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

						<div className="flex flex-col space-y-4">
							<label htmlFor="lesson" className="ml-2 font-bold text-xl">
								Lessons:
							</label>
							{courseData.lessons.map((data: any, index: number) => (
								<div
									className="collapse collapse-arrow bg-gray-100 dark:bg-gray-800 mb-2"
									key={index}
								>
									<input type="radio" name="my-accordion-1" />
									<div className="collapse-title text-md font-medium">
										{index + 1 + ".  " + data.title}
									</div>
									<div className="collapse-content text-sm p-4">
										<div className="flex space-x-3">
											<iframe src={data.video} className="w-1/2 h-48"></iframe>
											<div className="mt-2">
												<p>{data.description}</p>
												{data?.objectives.map(
													(objective: string, idx: number) => (
														<div key={idx} className="flex items-center">
															<p>
																<PlayArrowIcon fontSize="small" /> {objective}
															</p>
														</div>
													)
												)}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Right Section */}
					<div className="lg:w-1/3 py-4 px-6 rounded-2xl bg-gray-100 shadow-md dark:bg-gray-900">
							<div className="flex justify-center pb-4" >
						<button className="btn btn-outline btn-accent" onClick={() => navigate('/instructor/add-course',{state: {data: courseData}})} >
							Update Course
						</button>

							</div>
						{/* Video/Image Section */}
						<div className="relative pb-56 mb-4 overflow-hidden rounded-lg">
							<iframe
								src={courseData?.trial.video}
								className="absolute h-full w-full object-cover"
								title="Course Video"
							/>
						</div>
						{/* Course Info */}
						<div className="text-center mb-4">
							{courseData.pricing.type == "free" ? (
								<p className="text-green-500 text-2xl font-bold mb-2">FREE</p>
							) : (
								<>
									<p className="text-green-500 text-2xl font-bold mb-2">
										{" "}
										<CurrencyRupeeIcon /> {courseData.pricing.amount}
									</p>

									<p className="text-gray-600 dark:text-gray-400 line-through mb-2">
										${courseData?.pricing.amount} 50% off
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
	);
};

export default SingleCoursePage;
