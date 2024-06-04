import login from "@/assets/auth/signups.png";
import { GoogleLogin } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/common/users/Header";
import { Form, Formik } from "formik";
import InputField from "@/components/common/skeleton/InputField";
import { signupSchema } from "@/validationSchemas/signupSchema";
import PasswordField from "@/components/auth/PasswordField";
import {
	findEmailAction,
	findUsernameAction,
	googleAuthAction,
} from "@/redux/store/actions/auth";
import { useTheme } from "@/components/ui/theme-provider";
import { SignupFormData } from "@/types/IForms";
import { useAppDispatch } from "@/hooks/hooks";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import { storeUserData } from "@/redux/store/slices/user";

const SignUp: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const initialValues = {
		userName: "",
		email: "",
		password: "",
		confirmPassword: "",
	};
	const { theme } = useTheme();
	const dispatch = useAppDispatch();

	const handleSubmit = async (data: any) => {
		try {
			const result1: any = await dispatch(findUsernameAction(data.userName));
			if (!result1?.payload?.success) {
				toast.error("Username is already taken..!!");
				return;
			}

			const result: any = await dispatch(findEmailAction(data.email));
			if (!result.payload || !result.payload.success) {
				toast.error("This email already exits please login..");
				return;
			}

			let allData: SignupFormData = {
				...data,
				role: location.state.role,
				isGAuth: false,
			};

			console.log("nwe check", allData);

			if (location.state.role === "student") {
				navigate("/student-form", { state: allData });
			} else {
				navigate("/teacher-form", { state: allData });
			}
		} catch (error: any) {
			throw new Error(error?.message);
		}
	};

	const loginWithGoogle = async (credentialResponse: any) => {
		try {
			const response = await dispatch(googleAuthAction(credentialResponse));
			console.log("google auth res: ", response);

			if (response.payload.existingUser && response.payload.data.isGAuth) {
				dispatch(storeUserData(response.payload.data));
				navigate("/");
				return;
			} else if (response.payload.existingUser && !response.payload.data.isGAuth) {
				toast.error("Account already exist", {
					description:
						"Account created using email and password can't login using Google !!",
					duration: 6000,
				});
				return;
			}

			const allData: SignupFormData = {
				role: location.state.role,
				email: response.payload.data.email,
				password: response.payload.data.password,
				userName: "."+response.payload.data.email.split("@")[0].toLowerCase(),
				isGAuth: true,
				isVerified: location.state.role == "instructor" ? false : true,
			};

			console.log("signup 1", allData);

			if (location.state.role === "student") {
				navigate("/student-form", { state: allData });
			} else {
				navigate("/teacher-form", { state: allData });
			}
		} catch (error: any) {
			console.log("Login Failed", error);
			toast.error("Something is wrong! Please try later");
		}
	};

	return (
		<>
			<Toaster position="top-center" richColors />
			<Header />
			<div className="min-h-screen">
				<div className="flex flex-col md:flex-row max-w-7xl mx-auto items-center">
					<motion.div
						className="w-full md:w-1/2"
						initial={{ opacity: 0, x: -100 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<img src={login} alt="Signup" className="text-center lg:w-[80%] " />
					</motion.div>
					<motion.div
						className="w-full md:w-1/2 p-5"
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<h1 className="text-violet-700 text-3xl font-bold p-4">
							<span
								className={` ${
									theme === "light" ? "text-blue-950" : "text-white"
								} `}
							>
								{location.state.role === "student" ? "Student" : "Instructor"}
							</span>{" "}
							Signup
						</h1>

						<div className="flex flex-col gap-3 m-2">
							<Formik
								initialValues={initialValues}
								onSubmit={handleSubmit}
								validationSchema={signupSchema}
							>
								{({ isSubmitting }) => (
									<Form className="flex flex-col gap-3 m-2">
										<InputField
											name="userName"
											type="text"
											placeholder="Username"
										/>
										<InputField name="email" type="email" placeholder="Email" />
										<PasswordField name="password" placeholder="Password" />
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
								<GoogleLogin
									onSuccess={loginWithGoogle}
									onError={() => {
										console.log("Login Failed");
									}}
									width="250"
								/>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</>
	);
};

export default SignUp;
