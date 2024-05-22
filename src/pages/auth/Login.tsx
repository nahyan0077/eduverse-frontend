import login from "@/assets/auth/loginss.png";
import { useLocation, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import Header from "@/components/home/Header";
import InputField from "@/components/auth/InputField";
import { Form, Formik } from "formik";
import { loginSchema } from "@/validationSchemas/loginSchema";
import PasswordField from "@/components/auth/PasswordField";
import { useTheme } from "@/components/ui/theme-provider";

const Login: React.FC = () => {
	const navigate = useNavigate();
	const { theme } = useTheme();
	const initialvalues = {
		email: "",
		password: "",
	};
	const location = useLocation();
	console.log(location.state, "login");

	const handleSubmit = (value: any) => {
		console.log(value);
	};

	return (
		<>
			<Header />
			<div className=" min-h-screen">
				<div className="flex flex-col lg:flex-row max-w-7xl mx-auto items-center">
					<div className="w-full lg:w-1/2">
						<img src={login} alt="" className="w-full" />
					</div>
					<div className="w-full lg:w-1/2 p-5">
						{location.state.role == "student" && (
							<h1 className="text-violet-700 text-3xl font-bold p-4">
								{" "}
								<span
									className={` ${
										theme == "light" ? "text-blue-950" : "text-white"
									} `}
								>
									Student
								</span>{" "}
								Login
							</h1>
						)}
						{location.state.role == "instructor" && (
							<h1 className="text-violet-700 text-3xl font-bold p-4">
								{" "}
								<span
									className={` ${
										theme == "light" ? "text-blue-950" : "text-white"
									} `}
								>
									Instructor
								</span>{" "}
								Login
							</h1>
						)}

						<div className="flex flex-col gap-3  m-2 ">
							<Formik
								initialValues={initialvalues}
								onSubmit={handleSubmit}
								validationSchema={loginSchema}
							>
								<Form className="flex flex-col gap-3  m-2 ">
									<InputField name="email" type="text" placeholder="email" />
									<PasswordField name="password" placeholder="password" />
									<button
										className="bg-violet-700 text-white font-bold p-2 text-sm rounded-md mt-3"
										type="submit"
									>
										Login
									</button>
								</Form>
							</Formik>
						
								<div className="flex justify-between">
									<div className="">
										<p
											className="text-center text-sm hover:cursor-pointer ml-2"
											onClick={() =>
												navigate("/signup", { state: location.state })
											}
										>
											Don't have an account ?{" "}
											<span className="text-violet-700 font-bold">Sign Up</span>
										</p>
									</div>
									<div className="text-violet-500 text-sm font-bold">Forgot Password?</div>
								</div>
					
							<div className="flex justify-center mt-2">
								<button className="btn bg-white hover:bg-violet-700 text-violet-700 hover:text-white rounded-full border-violet-700 text-xs px-4 py-1">
									<GoogleIcon className="text-center  rounded-full " />
									Sign in with google
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Login;
