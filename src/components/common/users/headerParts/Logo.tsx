import React from "react";
import { useNavigate } from "react-router-dom";
import { TbBulb } from "react-icons/tb";
import { useTheme } from "../../../ui/theme-provider";

const Logo: React.FC = () => {
	const navigate = useNavigate();
	const { theme } = useTheme();

	return (
		<div
			className={`flex items-center ${
				theme === "light"
					? "bg-gradient-to-r from-pink-700 to-blue-500 bg-clip-text text-transparent"
					: "bg-gradient-to-r from-pink-600 to-blue-500 bg-clip-text text-transparent"
			} cursor-pointer`}
			onClick={() => navigate("/home")}
		>
			<span className="font-extrabold text-3xl">EDU</span>
			<TbBulb className="font-extrabold text-3xl mt-0.5 text-violet-700 dark:text-violet-300" />
			<span className="font-extrabold text-3xl">VERSE</span>
		</div>
	);
};

export default Logo;
