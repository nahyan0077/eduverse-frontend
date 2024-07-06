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
import { useTheme } from "../ui/theme-provider";
import LoadingPopUp from "../common/skeleton/LoadingPopUp";
import { CurrencyRupee as CurrencyRupeeIcon } from "@mui/icons-material";
import { Toaster, toast } from "sonner";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import banner from "@/assets/course/banner1.jpg";
import { createPaymentSessionAction } from "@/redux/store/actions/payment";
import { useAppDispatch } from "@/hooks/hooks";
import { storeObject } from "@/utils/localStorage";
import { loadStripe } from "@stripe/stripe-js";
import {
	createEnrollmentAction,
	getEnrollmentByUserIdAction,
} from "@/redux/store/actions/enrollment";
import { CourseIncludesSection } from "./CourseIncludesSection";
import { ReviewsSection } from "../student/enrollments/singleEnrollments/CourseReview";
import { ReviewEntity } from "@/types/IReview";
import { getAllReviewsAction } from "@/redux/store/actions/review";
import Pagination from "../common/admin/Pagination";
import { createChatAction } from "@/redux/store/actions/chat";
import { updateCourseAction } from "@/redux/store/actions/course";

export const SingleCoursePage: React.FC = () => {
	const [courseData, setCourseData] = useState<any>(null);
	const location = useLocation();
	const { theme } = useTheme();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const [isEnrolled, setIsEnrolled] = useState(false);
	const [reviews, setReviews] = useState <ReviewEntity[]> ([])
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPage] = useState(1);
	const [overallRating, setOverallRating] = useState<number>(0);

	const { data } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (location.state?.course) {
			setCourseData(location.state.course);
		}
	}, [location.state]);

	useEffect(() => {
		if (courseData) {
		  fetchReviews();
		}
	  }, [courseData,currentPage]);

	useEffect(() => {
		if (data?._id && courseData?._id) {
			handleFetchEnrollment();
		}
	}, [data, courseData]);

	const handleFetchEnrollment = async () => {
		try {
			if (data && data._id) {
				const response = await dispatch(getEnrollmentByUserIdAction(data._id));
				response.payload.data.forEach((item: any) => {
					if (item.courseId._id === courseData._id) {
						setIsEnrolled(true);
					}
				});
			}
		} catch (error: any) {
			console.error("Error fetching enrollment:", error);
		}
	};
	
	const fetchReviews = async () => {
		const response = await dispatch(getAllReviewsAction({page:currentPage,limit:4,courseId: courseData?._id}))
		console.log(response,"get all reviews");
		setReviews(response.payload.data.reviews)
		setCurrentPage(response.payload.data.currentPage)
		setTotalPage(response.payload.data.totalPages)

		if (reviews.length > 0 ) {
            const totalRating = reviews.reduce((sum, review) => sum + review?.rating, 0);
            const averageRating = totalRating / reviews.length;
            setOverallRating(Number(averageRating.toFixed(1)));
			
        }
	}


	const createNewChat = async (studentId: string, instructorId: string) => {

		const response = await dispatch(createChatAction({
			participants:[studentId,instructorId]
		}))
		console.log(response,"text");
		

}

	const handleEnrollCourse = async () => {
		try {
			if (courseData?.pricing?.type === "paid") {
				handlePayment();
				return;
			}
			if (!data || !data._id) {
				toast.error("Please login to enroll in the course.");
				navigate("/login");
				return;
			}

			const result: any = await dispatch(
				createEnrollmentAction({
					userId: data._id,
					courseId: courseData._id,
					enrolledAt: Date.now(),
				})
			);

			if (createEnrollmentAction.fulfilled.match(result)) {
				toast.success(
					"Congratulations! You have successfully enrolled in this course!"
				);

				await dispatch(updateCourseAction({
					data: { _id: courseData._id },
					incrementStudentsEnrolled: true
				}));

				//chat creation
				createNewChat(data._id, courseData.instructorRef._id)

			} else {
				toast.error("Enrollment failed", {
					description: result?.payload?.message,
				});
			}
		} catch (error: any) {
			console.error("Enrollment error:", error);
			toast.error("Enrollment error", { description: error?.message });
		}
	};

	const handlePayment = async () => {
		try {
			if (!data || !data._id) {
				toast.error("Please login to enroll in the course.");
				navigate("/login");
				return;
			}
			setLoading(true);
			const stripe = await loadStripe(
				import.meta.env.VITE_REACT_APP_PUBLIC_STRIPE_KEY as string
			);

			const sessionData = {
				courseName: courseData.title,
				courseThumbnail: courseData?.thumbnail,
				courseId: courseData._id,
				amount: courseData?.pricing?.amount,
				userId: data._id,
			};

			const response = await dispatch(createPaymentSessionAction(sessionData));

			if (!response?.payload || !response?.payload?.success) {
				toast.error("Error occurred");
				throw new Error("Something went wrong, try again!");
			}

			storeObject("payment_session", {
				...response.payload?.data,
				amount: courseData.pricing.amount,
				instructorId: courseData.instructorRef._id,
			});

			const sessionId = response.payload.data.sessionId;

			setLoading(false);
			const result = await stripe?.redirectToCheckout({ sessionId });

			if (result?.error) {
				throw new Error(result.error.message);
			}
		} catch (error: any) {
			console.error("Payment error:", error);
			toast.error(error.message);
		}
	};


	const handlePageChange = ( page: number ) => {
		setCurrentPage(page)
	}

	return (
		<>
			<div className=" w-full h-[15vh] md:h-[30vh] sticky top-0">
				<img src={banner} className="" alt="" />
			</div>
			<div
				className={`relative min-h-screen max-w-7xl mx-auto mb-10  ${
					theme === "light" ? "text-gray-900" : "text-gray-100 mb-5"
				}`}
			>
				<LoadingPopUp isLoading={loading} />
				<Toaster richColors position="top-center" />
				{courseData ? (
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
										src={courseData.instructorRef.profile.avatar}
										alt="Instructor"
										className="object-cover w-10 h-10 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500 mr-3 ml-1"
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

							<div className="shadow-md px-10 py-6 mb-6 space-y-12">
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

							{/* here */}
							<CourseIncludesSection />

							<div className="flex flex-col space-y-4 p-10 ">
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
										<div className="collapse-content text-xs">
											<p>{data.description}</p>
										</div>
									</div>
								))}
							</div>

														{/* <---------------- course review -----------> */}

														<div className="lg:w-ful">
								<div className="bg-white dark:bg-gray-900 p-6 rounded-xl mb-6 shadow-md">
									<h2 className="text-xl font-bold mb-4">Course Reviews</h2>
									<div className="flex justify-end" >
									<span className=" text-md badge badge-ghost badge-lg font-bold p-2">Average rating: {overallRating}</span>

									</div>
									<ReviewsSection reviews={reviews} />
									<Pagination
										currentPage={currentPage}
										totalPages={totalPages}
										onPageChange={handlePageChange}
									/>
								</div>
							</div>
						</div>

						{/* Right Section */}
						<div className="lg:w-1/3 py-4 px-6 rounded-e-3xl rounded-s-md bg-white dark:bg-gray-900 shadow-lg">
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
								{courseData.pricing.type === "free" ? (
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
								<div className="flex justify-center w-full p-3">
									{isEnrolled ? (
										<div className="flex flex-col gap-5" >

										<div className="badge badge-success badge-lg font-bold animate-pulse transition duration-300 ease-in-out">
											Already Enrolled
										</div>
										<button className="btn btn-outline btn-accent" onClick={()=>navigate('/student/enrollments')} >Go to Dashboard</button>
										</div>
									) : courseData.pricing.type === "paid" ? (
										<button
											className="btn bg-violet-500 btn-block hover:bg-violet-300 text-white "
											onClick={handleEnrollCourse}
										>
											Buy Now
										</button>
									) : (
										<button
											className="btn btn-success btn-block  "
											onClick={handleEnrollCourse}
										>
											Enroll Now
										</button>
									)}
								</div>
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

export default SingleCoursePage;
