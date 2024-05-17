import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useTheme } from "../ui/theme-provider";

interface PasswordFieldProps {
	name: string;
	placeholder: string;
	value?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
	name,
	placeholder,
	value,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = () => {
		setShowPassword(!showPassword);
		setTimeout(() => {
			setShowPassword(false);
		}, 1000);
	};

	const eyeIcon = showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />;
	const { theme } = useTheme()

	return (
		<>
			<div className="flex items-center relative">
				<Field
					className={`w-full px-5 py-3 rounded-lg font-medium border-2 ${theme === 'light' ? "bg-gray-200" : "bg-gray-900"} border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100`}
					placeholder={placeholder}
					id={name}
					type={showPassword ? "text" : "password"}
					value={value}
				/>
				<div
					className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500 cursor-pointer"
					onClick={togglePassword}
				>
					{eyeIcon}
				</div>
			</div>
			<ErrorMessage
				className="text-xs font-semibold text-red-500 ml-3"
				name={name}
				component="span"
			/>
		</>
	);
};
export default PasswordField;
