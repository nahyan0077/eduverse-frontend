import React from "react";
import { motion } from "framer-motion";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useNavigate } from "react-router-dom";

export const StudentChatSubscription: React.FC = () => {
	const navigate = useNavigate();

	const cardVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.1,
				duration: 0.5,
				ease: "easeOut",
			},
		}),
	};

    

	const plans = [
		{
			title: "Basic Plan",
			price: "$9.99/month",
			description1: "Access to basic courses",
			description2: "Standard support",
			description3: "Regular updates",
			isPopular: false,
		},
		{
			title: "Premium Plan",
			price: "$29.99/month",
			description1: "Access to all courses",
			description2: "Priority support",
			description3: "Exclusive content",
			isPopular: true,
		},
		{
			title: "Pro Plan",
			price: "$49.99/month",
			description1: "Access to all courses",
			description2: "One-on-one mentorship",
			description3: "Early access to new content",
			isPopular: false,
		},
	];

	return (
		<div>
			<h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 text-center mb-10 mt-20">
				Mentor Subscription <span className="text-violet-500">Packages</span>
			</h2>

			<div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 p-8">
				{plans.map((plan, index) => (
					<motion.div
						key={index}
						className={`
						relative overflow-hidden rounded-2xl shadow-lg
						${plan.isPopular ? "bg-violet-700" : "bg-white dark:bg-gray-800"}
						hover:shadow-2xl transition-all duration-300
						${plan.isPopular ? "scale-105" : "hover:scale-105"}
					`}
						variants={cardVariants}
						initial="hidden"
						animate="visible"
						custom={index}
						whileHover={{ y: 10 }}
					>
						{plan.isPopular && (
							<motion.div
								className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-bl-lg"
								initial={{ x: 100 }}
								animate={{ x: 0 }}
								transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
							>
								Popular
							</motion.div>
						)}
						<div className="p-8 text-center mb-12">
							<h3
								className={`text-2xl font-bold mb-4 ${
									plan.isPopular
										? "text-white"
										: "text-gray-900 dark:text-white"
								}`}
							>
								{plan.title}
							</h3>
							<p
								className={`text-4xl font-extrabold mb-6 ${
									plan.isPopular ? "text-yellow-400" : "text-violet-600"
								}`}
							>
								{plan.price}
							</p>
							<p
								className={`mb-4 ${
									plan.isPopular
										? "text-gray-200"
										: "text-gray-600 dark:text-gray-300"
								}`}
							>
								<DoneAllIcon color="secondary" /> {plan.description1}
							</p>
							<p
								className={`mb-4 ${
									plan.isPopular
										? "text-gray-200"
										: "text-gray-600 dark:text-gray-300"
								}`}
							>
								<DoneAllIcon color="secondary" /> {plan.description2}
							</p>
							<p
								className={`mb-4 ${
									plan.isPopular
										? "text-gray-200"
										: "text-gray-600 dark:text-gray-300"
								}`}
							>
								<DoneAllIcon color="secondary" /> {plan.description3}
							</p>
							<motion.button
								className={`
								py-3 px-6 rounded-full text-lg font-semibold
								${
									plan.isPopular
										? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
										: "bg-violet-600 text-white hover:bg-violet-700"
								}
								transition duration-300
							`}
								// onClick={handleModalOpen}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								Get Started
							</motion.button>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default StudentChatSubscription;
