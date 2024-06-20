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
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import banner from "@/assets/course/banner1.jpg";
import { useAppDispatch } from "@/hooks/hooks";

import { CourseReview } from "./CourseReview";


export const SingleEnrollmentPage: React.FC = () => {
	const [courseData, setCourseData] = useState<any>(null);
	const location = useLocation();
	const { theme } = useTheme();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);

	const { data } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (location.state) {
			setCourseData(location.state);
		}
	}, [location.state]);

    const fetchData = async () => {
        // const response = await dispatch()
    }

    console.log(location.state,"statee data in single enrooll");
    

	return (
		<>
			<div className="relative w-full h-[15vh] md:h-[30vh] ">
				<img src={banner} className="" alt="" />
			</div>
			<div
				className={`relative min-h-screen max-w-7xl mx-auto mb-10  ${
					theme === "light" ? "text-gray-900" : "text-gray-100 mb-5"
				}`}
			>
				{/* <LoadingPopUp isLoading={loading} /> */}
				<Toaster richColors position="top-center" />

					<div
						className={`relative flex flex-col lg:flex-row rounded-3xl overflow-hidden space-y-5 lg:space-y-0 lg:space-x-5 -mt-20 p-4  ${
							theme == "dark"
								? "bg-slate-800"
								: "bg-gradient-to-r from-fuchsia-50 to-violet-100"
						} `}
					>
						{/* Left Section */}
						<div className="lg:w-2/3 rounded-xl  bg-white dark:bg-gray-900 ">
							<div className="mb-4 bg-violet-200 dark:bg-gray-950 rounded-t-3xl p-6">
								<div className="flex items-center mb-2 ">
									<img
										src=""
										alt="Instructor"
										className="object-cover w-10 h-10 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500 mr-3 ml-1"
									/>
									<div>
										<h2 className="text-lg font-bold">
									
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
								 Lessons
									</span>
									<span className="ml-4 text-gray-600 dark:text-gray-400">
										<AccessTimeIcon color="warning" fontSize="small" />{" "}
									hours
									</span>
									<span className="ml-4 text-gray-600 dark:text-gray-400">
										<BoltIcon color="warning" fontSize="small" />{" "}
								
									</span>
								</div>
							</div>

							<div className="shadow-md px-10 py-6 mb-6 space-y-12">
								<div className="mb-4">
									<h3 className="text-lg font-bold mb-2">Overview</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
									
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

							<div className="flex flex-col space-y-4 p-10 ">
								<label htmlFor="lesson" className="ml-2 font-bold text-xl">
									Lessons:
								</label>

							</div>
							
							<CourseReview />

						</div>


						{/* Right Section */}
						<div className="lg:w-1/3 py-4 px-6 rounded-e-3xl rounded-s-md bg-white dark:bg-gray-900 shadow-lg">
							{/* Video/Image Section */}
							<div className="relative pb-56 mb-4 overflow-hidden rounded-lg">
								<iframe
									src=""
									className="absolute h-full w-full object-cover"
									title="Course Video"
								/>
							</div>
							{/* Course Info */}
							<div className="text-center mb-4">


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
												Enrolled: <strong></strong>
											</span>
										</li>
										<li className="flex items-center">
											<AccessTimeIcon className="mr-2" />
											<span>
												Duration: <strong>hours</strong>
											</span>
										</li>
										<li className="flex items-center">
											<LibraryBooksIcon className="mr-2" />
											<span>
												Chapters: <strong></strong>
											</span>
										</li>
										<li className="flex items-center">
											<BoltIcon className="mr-2" />
											<span>
												Level: <strong></strong>
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

			</div>
		</>
	);
};

