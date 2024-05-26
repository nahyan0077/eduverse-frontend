import login from "@/assets/auth/loginss.png";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/common/users/Header";
import InputField from "@/components/auth/InputField";
import { Form, Formik } from "formik";
import { loginSchema } from "@/validationSchemas/loginSchema";
import PasswordField from "@/components/auth/PasswordField";
import { useTheme } from "@/components/ui/theme-provider";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { loginAction } from "@/redux/store/actions/auth/loginAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storeUserData } from "@/redux/store/slices/user";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { SignupFormData } from "@/types/IForms";
import { googleAuthAction } from "@/redux/store/actions/auth";

const Login: React.FC = () => {
	const navigate = useNavigate();
	const { theme } = useTheme();
	const initialValues = {
		email: "",
		password: "",
	};
	const location = useLocation();
	const dispatch = useAppDispatch();

	const userData = useAppSelector((state: RootState) => state.user);

	useEffect(() => {
		console.log("User Data:", userData);
	}, [userData]);

	console.log(location.state, "login");

	const handleSubmit = async (value: any) => {
		console.log(value, "login data");

		const result = await dispatch(loginAction(value));

		console.log("login approval", result);

		if (!result.payload.success) {
			toast.error("Email or Password doesnt match", {
				position: "top-center",
				autoClose: 4000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		} else {
			dispatch(storeUserData(result.payload.data));

			if (result.payload.data.role == "instructor") {
				
				navigate("/verification-page");
			}else{
				console.log('this is student');
				
			}

		}
	};

	const loginWithGoogle = async (credentialResponse: any) => {
		try {
			const response = await dispatch(googleAuthAction(credentialResponse));

			if(response.payload.existingUser){
                navigate('/')
                return
            }

			const allData: SignupFormData = {
				role: location.state.role,
				email: response.payload.data.email,
				password: response.payload.data.password,
				username: response.payload.data.email.split("@")[0].toLowerCase(),
				isGAuth: true,
			};

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

	const role = location.state?.role ?? "";

	return (
		<>
			<ToastContainer />
			<Header />
			<div className="min-h-screen">
				<div className="flex flex-col lg:flex-row max-w-7xl mx-auto items-center">
					<motion.div
						className="w-full lg:w-1/2"
						initial={{ opacity: 0, x: -100 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<img src={login} alt="Login" className="w-full" />
					</motion.div>
					<motion.div
						className="w-full lg:w-1/2 p-5"
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<h1 className="text-violet-700 text-3xl font-bold p-4">
							<span
								className={`${
									theme === "light" ? "text-blue-950" : "text-white"
								}`}
							>
								{role ?  role.charAt(0).toUpperCase() + role.slice(1) : "" }
							</span>{" "}
							Login
						</h1>

						<div className="flex flex-col gap-3 m-2">
							<Formik
								initialValues={initialValues}
								onSubmit={handleSubmit}
								validationSchema={loginSchema}
							>
								{({ isSubmitting }) => (
									<Form className="flex flex-col gap-3 m-2">
										<InputField name="email" type="text" placeholder="Email" />
										<PasswordField name="password" placeholder="Password" />
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
											Login
										</motion.button>
									</Form>
								)}
							</Formik>

							<div className="flex justify-between">
								<p
									className="text-center text-sm hover:cursor-pointer ml-2"
									onClick={() => navigate("/selection", { state: location.state })}
								>
									Don't have an account?{" "}
									<span className="text-violet-700 font-bold">Get Started</span>
								</p>
								<div className="text-violet-500 text-sm font-bold">
									Forgot Password?
								</div>
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

export default Login;
