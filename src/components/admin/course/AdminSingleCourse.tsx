import React, { useEffect, useState } from "react";
import {
	Bolt as BoltIcon,
	AccessTime as AccessTimeIcon,
	LibraryBooks as LibraryBooksIcon,
	People as PeopleIcon,
	Style as StyleIcon,
	Assignment as AssignmentIcon,
	ThumbUpAlt as ThumbUpAltIcon,
	Phonelink as PhonelinkIcon,
	CloudDownload as CloudDownloadIcon,
	Videocam as VideocamIcon,
	Code as CodeIcon,
	Article as ArticleIcon,
	EmojiEvents as EmojiEventsIcon,
	CurrencyRupee as CurrencyRupeeIcon,
	Verified as VerifiedIcon,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../ui/theme-provider";
import LoadingPopUp from "../../common/skeleton/LoadingPopUp";
import ConfirmModal from "@/components/common/modal/ConfirmModal";
import { useAppDispatch } from "@/hooks/hooks";
import { updateCourseAction } from "@/redux/store/actions/course";
import DangerousIcon from "@mui/icons-material/Dangerous";

export const AdminSingleCourse: React.FC = () => {
	const [courseData, setCourseData] = useState<any>(null);
	const location = useLocation();
	const { theme } = useTheme();
	const [isModalVisible, setModalVisible] = useState(false);
	const [isModalVisible1, setModalVisible1] = useState(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (location.state.data) {
			setCourseData(location.state.data);
			console.log(location.state.data, "single product data");
		}
	}, [location.state]);

	const handleDelete = async () => {
		const data = {
			...courseData,
			isRequested: false,
			isPublished: true,
		};

		console.log(data, "this data to send");

		const result = await dispatch(updateCourseAction(data));

		console.log(result, "approve course");

		setModalVisible(false);
	};
	const handleDelete1 = async () => {
		const data = {
			...courseData,
			isRejected: false,
			isRequested: false,
		};

		const result = await dispatch(updateCourseAction(data));

		console.log(result, "reject course");

		setModalVisible1(false);
	};
	const handleCancel = () => {
		setModalVisible(false);
		setModalVisible1(false);
	};

	return (
		<div
			className={`min-h-screen max-w-full mx-auto p-10 ${
				theme === "light"
					? "bg-white text-gray-900"
					: "bg-gray-900 text-gray-100"
			}`}
		>
			{isModalVisible && (
				<ConfirmModal
					message={`Approve this course`}
					onConfirm={handleDelete}
					onCancel={handleCancel}
				/>
			)}
			{isModalVisible1 && (
				<ConfirmModal
					message={`Reject this course`}
					onConfirm={handleDelete1}
					onCancel={handleCancel}
				/>
			)}
			{courseData ? (
				<div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden space-y-5 lg:space-y-0 lg:space-x-5">
					{/* Left Section */}
					<div className="lg:w-2/3 p-10 rounded-xl bg-gray-50 dark:bg-gray-800">
						<div className="mb-4">
							<div className="flex items-center mb-4">
								<img
									src={courseData?.thumbnail}
									alt="Instructor"
									className="w-12 h-12 rounded-full mr-4"
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
							<h1 className="text-3xl font-bold mb-2">{courseData?.title}</h1>
							<div className="flex items-center flex-wrap mb-4">
								<span className="text-yellow-500">★★★★☆</span>
								<span className="ml-2 text-gray-600 dark:text-gray-400">
									(15)
								</span>
								<span className="ml-4 text-gray-600 dark:text-gray-400 flex items-center">
									<LibraryBooksIcon color="warning" fontSize="small" />{" "}
									{courseData.lessons.length} Lessons
								</span>
								<span className="ml-4 text-gray-600 dark:text-gray-400 flex items-center">
									<AccessTimeIcon color="warning" fontSize="small" />{" "}
									{courseData.duration} hours
								</span>
								<span className="ml-4 text-gray-600 dark:text-gray-400 flex items-center">
									<BoltIcon color="warning" fontSize="small" />{" "}
									{courseData.level}
								</span>
							</div>
						</div>

						<div className="shadow-md p-6 mb-6 bg-white dark:bg-gray-700 rounded-lg">
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

						<div className="shadow-md p-6 mb-6 bg-white dark:bg-gray-700 rounded-lg">
							<h2 className="text-xl font-bold mb-4">This course includes:</h2>
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
							{courseData.lessons.map((lesson: any, index: number) => (
								<div
									className="collapse collapse-arrow bg-gray-100 dark:bg-gray-700 mb-2 rounded-lg"
									key={index}
								>
									<input type="radio" name="my-accordion-1" />
									<div className="collapse-title text-md font-medium">
										{index + 1 + ". " + lesson.title}
									</div>
									<div className="collapse-content text-xs p-4">
										<div className="flex space-x-3">
											<iframe
												src={lesson.video}
												className="w-1/2 h-48"
											></iframe>
											<div>
												<p>{lesson.description}</p>
												{lesson?.objectives.map(
													(objective: string, idx: number) => (
														<div key={idx} className="flex items-center">
															<p>{objective}</p>
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
					<div className="lg:w-1/3 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800">
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
							<div className="flex justify-around mb-4"></div>
						</div>
						<div className="p-4">
							<div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-6">
								<h2 className="text-xl font-bold mb-4">Includes</h2>
								<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
									<li className="flex items-center">
										<VideocamIcon className="mr-2" />
										<span>11 hours on-demand video</span>
									</li>
									<li className="flex items-center">
										<CloudDownloadIcon className="mr-2" />
										<span>69 downloadable resources</span>
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

							<div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
								<h2 className="text-xl font-bold mb-4">Details</h2>
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
						{!courseData.isPublished && !courseData.isRejected  && courseData.isRequested ?  (
							<div>
								<p className="p-4 text-sm italic">
									After verifiying all the course details you can either approve
									or reject the course{" "}
								</p>
								<div className="flex space-x-3 p-4 justify-end">
									<button
										className="btn btn-outline btn-accent"
										onClick={() => setModalVisible(true)}
									>
										Approve
									</button>
									<button
										className="btn btn-outline btn-error"
										onClick={() => setModalVisible1(true)}
									>
										Reject
									</button>
								</div>
							</div>
						) : courseData.isPublished && !courseData.isRejected ? (
							<div className="flex justify-center">
								<button className="btn btn-outline btn-success">
									{" "}
									<VerifiedIcon color="success" /> Approved
								</button>
							</div>
						) : (
							
							<div className="flex justify-center">
								<button className="btn btn-outline btn-error">
									{" "}
									<DangerousIcon color="error" /> Rejected
								</button>
							</div>
						
						)}
					</div>
				</div>
			) : (
				<LoadingPopUp isLoading={true} />
			)}
		</div>
	);
};
