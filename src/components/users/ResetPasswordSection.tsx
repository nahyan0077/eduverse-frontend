import React from "react";
import ForgotPass from "@/assets/auth/Forgot password.png";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import forgotPasswordSchema from "@/validationSchemas/forgotPasswordSchema";
import PasswordField from "../auth/PasswordField";
import { useAppDispatch } from "@/hooks/hooks";
import { updatePasswordAction } from "@/redux/store/actions/auth/updatePasswordAction";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useTheme } from "../ui/theme-provider";

export const ResetPasswordSection: React.FC = () => {
	const initialValues = {
		password: "",
		confirmPassword: "",
	};
	const { theme } = useTheme();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [searchParams] = useSearchParams();

	let token = searchParams.get("token");

	const handleSubmit = async (values: any) => {
		// Handle form submission
		console.log(values);
		if (!token) {
			console.error("Token is missing");
			return;
		}

		const response = await dispatch(
			updatePasswordAction({ token, password: values.password })
		);



		if (response.payload.success) {
			navigate("/");
		} else {
			toast.success("Password change failed");
		}
	};

	return (
		<div className="flex flex-col items-center -mt-20 min-h-screen max-w-7xl mx-auto md:flex-row">
			<Toaster richColors position="top-center" />
			<motion.div
				className="w-full md:w-1/2 p-8"
				initial={{ opacity: 0, x: -100 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5 }}
			>
				<img src={ForgotPass} alt="Forgot Password" className="mx-auto lg:w-[80%]" />
			</motion.div>
			<motion.div
				className="w-full md:w-1/2 px-8 flex flex-col justify-center "
				initial={{ opacity: 0, x: 100 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<h2 className="text-3xl lg:ml-16 font-bold text-violet-700 py-3 w-full ">
					Reset{" "}
					<span
						className={`${theme == "dark" ? "text-white" : "text-gray-900"}`}
					>
						Password?
					</span>
				</h2>
				<p className="text-xs lg:ml-16 mb-6">
					Enter your new password here *
				</p>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validationSchema={forgotPasswordSchema}
				>
					<Form className="flex flex-col gap-4 w-full max-w-md mx-auto">
						<PasswordField name="password" placeholder="New Password" />
						<PasswordField
							name="confirmPassword"
							placeholder="Confirm Password"
						/>
						<motion.button
							className="bg-violet-700 text-white font-bold p-2 text-sm rounded-md mt-3"
							type="submit"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 1 }}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							Submit
						</motion.button>
					</Form>
				</Formik>
			</motion.div>
		</div>
	);
};

export default ResetPasswordSection;
