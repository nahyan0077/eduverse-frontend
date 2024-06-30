import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { useTheme } from "@/components/ui/theme-provider";
import LoadingPopUp from "@/components/common/skeleton/LoadingPopUp";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getCourseByIdAction } from "@/redux/store/actions/course";
import {
	createReviewAction,
	getAllReviewsAction,
} from "@/redux/store/actions/review";
import { ReviewEntity } from "@/types/IReview";
import { RootState } from "@/redux/store";
import Pagination from "@/components/common/admin/Pagination";
import CourseBanner from "./singleEnrollments/CourseBanner";
import CourseInfo from "./singleEnrollments/CourseInfo";
import CourseIncludes from "./singleEnrollments/CourseIncludes";
import CourseLessons from "./singleEnrollments/CourseLessons";
import CourseAssignments from "./singleEnrollments/CourseAssignments";
import CourseReviews from "./singleEnrollments/CourseReviews";
import CourseDetails from "./singleEnrollments/CourseDetails";
import CoursePreview from "./singleEnrollments/CoursePreview";

export const SingleEnrollmentPage: React.FC = () => {
	const [courseData, setCourseData] = useState<any>(null);
	const location = useLocation();
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const [reviews, setReviews] = useState<ReviewEntity[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPage] = useState(1);
	const [courseId, setCourseId] = useState("");
	const [overallRating, setOverallRating] = useState<number>(0);

	const { data } = useAppSelector((state: RootState) => state.user);

	useEffect(() => {
		fetchData();
	}, [location.state]);

	useEffect(() => {
		if (courseData) {
			fetchReviews();
		}
	}, [courseData, currentPage]);

	const fetchData = async () => {
		setLoading(true);
		const response = await dispatch(
			getCourseByIdAction(location.state.courseId)
		);
		setCourseId(response.payload.data._id);
		setCourseData(response.payload.data);
		setLoading(false);
	};

	const fetchReviews = async () => {
		const response = await dispatch(
			getAllReviewsAction({ page: currentPage, limit: 4, courseId: courseId })
		);
		setReviews(response.payload.data.reviews);
		setCurrentPage(response.payload.data.currentPage);
		setTotalPage(response.payload.data.totalPages);

		if (reviews.length > 0) {
			const totalRating = reviews.reduce(
				(sum, review) => sum + review?.rating,
				0
			);
			const averageRating = totalRating / reviews.length;
			setOverallRating(Number(averageRating.toFixed(1)));
		}
	};

	if (loading) {
		return <LoadingPopUp isLoading={true} />;
	}

	const handleReviewSubmit = async (comment: string, rating: number) => {
		const reviewData: ReviewEntity = {
			userId: data?._id,
			courseId: courseData._id,
			comment,
			rating,
		};

		await dispatch(createReviewAction(reviewData));
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div
			className={`relative min-h-screen mb-10 ${
				theme === "light" ? "text-gray-900" : "text-gray-100 mb-5"
			}`}
		>
			<Toaster richColors position="top-center" />
			<CourseBanner />
			{courseData ? (
				<div
					className={`relative max-w-7xl mx-auto flex flex-col lg:flex-row rounded-3xl overflow-hidden space-y-5 lg:space-y-0 lg:space-x-5 -mt-20 p-4 ${
						theme === "dark"
							? "bg-slate-800"
							: "bg-gradient-to-r from-fuchsia-50 to-violet-100"
					}`}
				>
					<div className="lg:w-2/3 rounded-xl bg-white dark:bg-gray-900">
						<CourseInfo courseData={courseData} overallRating={overallRating} />
						<CourseIncludes courseData={courseData} />
						<CourseLessons courseData={courseData} />
						<CourseAssignments courseData={courseData} />
						<CourseReviews
							reviews={reviews}
							handleReviewSubmit={handleReviewSubmit}
							overallRating={overallRating}
						/>
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					</div>
					<div className="lg:w-1/3 py-4 px-6 rounded-e-3xl rounded-s-md bg-white dark:bg-gray-900 shadow-lg">
						<CoursePreview courseData={courseData} />
						<CourseDetails courseData={courseData} />
					</div>
				</div>
			) : (
				<LoadingPopUp isLoading={true} />
			)}
		</div>
	);
};
