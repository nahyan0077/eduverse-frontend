import React from "react";
import { motion } from "framer-motion";
import course1 from "@/assets/course/course-1.avif";
import course2 from "@/assets/course/coures-2.avif";
import course3 from "@/assets/course/course-3.avif";
import { Player } from "@lottiefiles/react-lottie-player";

export const CourseHeader: React.FC = () => {
	return (
		<div className="flex flex-col lg:flex-row items-center bg-violet-50 dark:bg-gray-900 justify-between rounded-lg px-6 lg:px-24 py-12 mx-4 mt-8">
			<motion.div
				className="max-w-lg"
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5 }}
			>
				<p className="text-violet-500 text-sm font-bold mb-2">
					📈 Improve your skills for free
				</p>
				<h1 className="text-3xl lg:text-4xl font-bold mb-4">
					Start learning from the world’s best{" "}
					<span className="text-violet-500">institutions</span>
				</h1>
				<p className="text-gray-600 dark:text-gray-400 mb-6">
					Tatweer was founded to provide life-transforming learning experiences
					to learners in the MENA region. Helping individuals & organizations
					drive performance with innovative learning solutions.
				</p>
				<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
					<motion.button
						className="bg-violet-700 hover:bg-violet-500 hover:text-white text-white py-2 px-4 rounded-full"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						Get Started
					</motion.button>
					<motion.button
						className="btn btn-outline hover:bg-violet-700 hover:text-white border-violet-500 text-violet-500 py-2 px-4 rounded-full"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						▶ How it works
					</motion.button>
				</div>
			</motion.div>
			<motion.div
				className="flex space-x-4 mt-8 lg:mt-0"
				initial={{ opacity: 0, x: 50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5 }}
			>
                <div className="" >

				<Player
					autoplay
					loop
					src="https://lottie.host/94ff26b1-52e0-4891-982b-ae8ad16a6439/YfESCaob74.json"
					style={{ height: "80%", width: "80%" }}
				/>
                </div>
			</motion.div>
		</div>
	);
};
