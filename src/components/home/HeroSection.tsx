import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/home/hero_image_bg.png";
import heroImageDark from "@/assets/home/home_drk.png";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../ui/theme-provider";

const HeroSection: React.FC = () => {
	const navigate = useNavigate();
	const { theme } = useTheme();

	return (
		<div className="text-violet-700 py-7 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between">
				<div className="flex flex-col items-center lg:w-1/2 lg:pr-10">
					<AnimatePresence>
						<motion.h1
							key="heading1"
							className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 ${theme === 'light' ? 'text-violet-700' : 'text-white'}`}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<span className="text-yellow-600">Studying</span> Online is{" "}
						</motion.h1>
						<motion.h1
							key="heading2"
							className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 ${theme === 'light' ? 'text-violet-700' : 'text-white'}`}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							now much easier
						</motion.h1>
						<motion.p
							key="paragraph1"
							className={`text-lg sm:text-xl md:text-2xl ${theme === 'light' ? 'text-violet-700' : 'text-gray-300'}`}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5, delay: 0.6 }}
						>
							EDU-VERSE is an interesting platform that
						</motion.p>
						<motion.p
							key="paragraph2"
							className={`text-lg sm:text-xl md:text-2xl ${theme === 'light' ? 'text-violet-700' : 'text-gray-300'} mb-8`}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5, delay: 0.8 }}
						>
							will teach you in a more interactive way.
						</motion.p>
					</AnimatePresence>
					<div className="flex items-center justify-center flex-wrap">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 1 }}
							onClick={() => navigate("/selection")}
							className="bg-violet-700 text-white font-bold py-3 px-6 rounded-full mr-4 mb-4 shadow-[5px_5px_0px_0px_rgba(109,40,217)]"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 1 }}
						>
							Get Started
						</motion.button>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 1 }}
							className={`bg-transparent ${theme === 'light' ? 'text-violet-700' : 'text-white'} border border-violet-700 font-bold py-3 px-6 rounded-full mb-4 shadow-[5px_5px_0px_0px_rgba(109,40,217)]`}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 1.2 }}
						>
							Learn More
						</motion.button>
					</div>
				</div>
				<AnimatePresence>
					<motion.div
						key="heroImage"
						className="lg:w-1/2"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.5, delay: 0.5 }}
					>
						<img src={theme === 'light' ? heroImage : heroImageDark} className="w-full" alt="Hero" />
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
};

export default HeroSection;
