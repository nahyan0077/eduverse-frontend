import Header from "@/components/common/users/Header";
import { useAppDispatch } from "@/hooks/hooks";
import { searchCourseAction } from "@/redux/store/actions/course";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Player } from "@lottiefiles/react-lottie-player";

export const SearchResult: React.FC = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const [courseData, setCourseData] = useState([]);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const query = params.get("query") || "";
		console.log(query, "search page");

		if (query) {
			fetchSearch(query);
		}
	}, [location.search]);

	const fetchSearch = async (query: string) => {
		if (query) {
			const response = await dispatch(searchCourseAction(query));
			setCourseData(response.payload.data);
			console.log(response, "search response");
		}
	};

	return (
		<>
			<Header />
			<div className="min-h-screen max-w-7xl mx-auto p-4">
				<div className="flex mb-4">
					<h2 className="text-3xl font-bold">Search Result:</h2>
				</div>
				{courseData.length === 0 ? (
					<div className="lg:pt-20  text-center">
						<Player
							autoplay
							loop
							src="https://lottie.host/2a21cfdf-5523-444f-a483-a4673cd63c49/bKl0W0Zndb.json"
							style={{ height: "20%", width: "20%" }}
						/>
						<h2 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">
							No search result found
						</h2>
					</div>
				) : (
					<div className="flex flex-wrap gap-4">
						{courseData.map((course: any) => (
							<motion.div
								key={course._id}
								className="card shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden border dark:border-violet-900 border-violet-300 max-w-xs"
								whileHover={{ scale: 1.02 }}
							>
								<figure className="relative">
									<motion.img
										src={course.thumbnail}
										alt={course.title}
										className="w-full h-48 object-cover"
										whileHover={{ scale: 1.1 }}
									/>
								</figure>
								<div className="card-body p-4">
									<h2 className="card-title text-lg font-semibold mb-2">
										{course.title}
									</h2>
									<div className="text-sm text-gray-500 flex items-center mb-2">
										<div className="avatar mr-2">
											<div className="w-6 rounded-full">
												<img
													src={course.instructorRef.profile.avatar}
													alt="Instructor"
												/>
											</div>
										</div>
										Instructor: {course.instructorRef.firstName}
									</div>
									<div className="text-sm text-gray-500 flex items-center mb-2">
										<AutoStoriesIcon
											color="secondary"
											fontSize="small"
											className="mr-1"
										/>
										Lessons:{" "}
										<span className="font-bold ml-1">
											{course.lessons?.length}
										</span>
									</div>
									<div className="text-sm text-gray-500 flex items-center mb-2">
										<AccessTimeIcon
											color="warning"
											fontSize="small"
											className="mr-1"
										/>
										Duration:{" "}
										<span className="font-bold ml-1">
											{/* Add duration here */}
										</span>
									</div>
									<p className="text-lg font-bold text-gray-800 mb-2">
										{course.pricing?.type === "paid" ? (
											<>
												<span className="line-through mr-2">
													{course.pricing.discountedAmount}
												</span>
												<span className="text-red-500">
													<CurrencyRupeeIcon fontSize="small" />{" "}
													{course.pricing.amount}
												</span>
											</>
										) : (
											<span className="text-green-500">Free</span>
										)}
									</p>
									<div className="flex justify-between items-center mt-1">
										<div>
											{course.level === "beginner" && (
												<span className="text-sm text-green-500">
													⭐ {course.level}
												</span>
											)}
											{course.level === "intermediate" && (
												<span className="text-sm text-yellow-500">
													⭐ {course.level}
												</span>
											)}
											{course.level === "expert" && (
												<span className="text-sm text-red-500">
													⭐ {course.level}
												</span>
											)}
										</div>
										<button className="btn btn-primary btn-outline btn-sm">
											Enroll Now
										</button>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				)}
			</div>
		</>
	);
};
