import login from "@/assets/auth/signups.png";
import GoogleIcon from "@mui/icons-material/Google";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/home/Header";
import { Form, Formik } from "formik";
import InputField from "@/components/auth/InputField";
import { signupSchema } from "@/validationSchemas/signupSchema";
import PasswordField from "@/components/auth/PasswordField";
import { findEmailAction, findUsernameAction } from "@/redux/store/actions/auth";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { useTheme } from "@/components/ui/theme-provider";
import { SignupFormData } from "@/types/forms";
import { useAppDispatch } from "@/hooks/hooks";
import { motion } from "framer-motion";
import {GoogleLogin} from '@react-oauth/google'



const SignUp: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const initialvalues = {
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	};
	const { theme } = useTheme();

	const dispatch = useAppDispatch();

	const [isEmailTaken, setTakenEmail] = useState(false);
	const [isUsernameTaken, setTakenUsername] = useState(false);

	const handleSubmit = async (data: any) => {
		setTakenEmail(false);
		setTakenUsername(false);

		try {
			const result1: any = await dispatch(findUsernameAction(data.username));
			if (!result1?.payload?.success) {
				setTakenUsername(true);
				setTimeout(() => {
					setTakenUsername(false);
				}, 4000);
				return;
			}

			const result: any = await dispatch(findEmailAction(data.email));
			if (!result.payload || !result.payload.success) {
				setTakenEmail(true);
				setTimeout(() => {
					setTakenEmail(false);
				}, 4000);
				return;
			}

			let allData: SignupFormData = {
				...data,
				role: location.state.role,
			};

			if (location.state.role == "student") {
				navigate("/student-form", { state: allData });
			} else {
				navigate("/teacher-form", { state: allData });
			}
		} catch (error: any) {
			throw new Error(error?.message);
		}
	};

	return (
		<>
			<Header />
			<div className="min-h-screen">
				<div className="flex flex-col md:flex-row max-w-7xl mx-auto items-center">
					<motion.div
						className="w-full md:w-1/2"
						initial={{ opacity: 0, x: -100 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<img src={login} alt="Signup" className="w-full" />
					</motion.div>
					<motion.div
						className="w-full md:w-1/2 p-5"
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<h1 className="text-violet-700 text-3xl font-bold p-4">
							{" "}
							<span
								className={` ${
									theme == "light" ? "text-blue-950" : "text-white"
								} `}
							>
								{location.state.role == "student" ? "Student" : "Instructor"}
							</span>{" "}
							Signup
						</h1>
						{isEmailTaken && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
							>
								<Alert variant="outlined" severity="error">
									Email is already exist, please login
								</Alert>
							</motion.div>
						)}
						{isUsernameTaken && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
							>
								<Alert variant="outlined" severity="error">
									Username is already taken
								</Alert>
							</motion.div>
						)}
						<div className="flex flex-col gap-3 m-2">
							<Formik
								initialValues={initialvalues}
								onSubmit={handleSubmit}
								validationSchema={signupSchema}
							>
								{({ isSubmitting }) => (
									<Form className="flex flex-col gap-3 m-2">
										<InputField name="username" type="text" placeholder="Username" />
										<InputField name="email" type="email" placeholder="Email" />
										<PasswordField name="password" placeholder="Password" />
										<PasswordField name="confirmPassword" placeholder="Confirm Password" />
										<motion.button
											className="bg-violet-700 text-white font-bold p-2 text-sm rounded-md mt-3"
											type="submit"
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 1 }}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.5 }}
											disabled={isSubmitting}
										>
											Sign Up
										</motion.button>
									</Form>
								)}
							</Formik>
							<div className="flex justify-center">
								<p
									className="text-center text-sm hover:cursor-pointer ml-2"
									onClick={() => navigate("/login", { state: { location } })}
								>
									Already have an account?{" "}
									<span className="text-violet-700 font-bold">Login</span>
								</p>
							</div>
							<div className="flex justify-center mt-2">
								<motion.button
									className="btn bg-white hover:bg-violet-700 text-violet-700 hover:text-white rounded-full border-violet-700 text-xs px-4 py-1"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 1 }}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5 }}
								>
									<GoogleIcon className="text-center rounded-full" />
									<GoogleLogin
									onSuccess={(credentialResponse) => {
										
									}}
									onError={() => {
										console.log("Login Failed");
									}}
									/>
									Sign in with Google
								</motion.button>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</>
	);
};

export default SignUp;
