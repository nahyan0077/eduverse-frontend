import login from "@/assets/auth/loginss.png";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import Header from "@/components/home/Header";
import InputField from "@/components/auth/InputField";
import { Form, Formik } from "formik";
import { loginSchema } from "@/validationSchemas/loginSchema";
import PasswordField from "@/components/auth/PasswordField";

const Login: React.FC = () => {
	const navigate = useNavigate();
	const initialvalues = {
		username: "",
		email: "",
		password: "",
		confirmpassword: "",
	};
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
						<h1 className="text-violet-700 text-3xl font-bold p-4">Login</h1>

						<div className="flex flex-col gap-3  m-2 ">
							<Formik 
							initialValues={initialvalues} 
							onSubmit={handleSubmit}
							validationSchema={loginSchema}
							>
								<Form className="flex flex-col gap-3  m-2 ">
									<InputField 
										name="email" 
										type="text" 
										placeholder="email" 
									/>
									<PasswordField name="pasword" placeholder="confirm password" />
									<button
										onClick={() => navigate("/student-form")}
										className="bg-violet-700 text-white font-bold p-2 text-sm rounded-xl m-5"
										type="submit"
									>
										Login
									</button>
								</Form>
							</Formik>
							<p className="text-violet-700 text-center font-bold">
								Forgot Password?
							</p>
							<div className="flex justify-center mt-2">
								<button className="btn bg-white hover:bg-violet-700 text-violet-700 hover:text-white rounded-full border-violet-700 text-xs">
									<GoogleIcon className="text-center  rounded-full " />
									Sign in with google
								</button>
							</div>
							<p
								className="text-center hover:cursor-pointer"
								onClick={() => navigate("/signup")}
							>
								Don't have an account ?{" "}
								<span className="text-violet-700 font-bold">Sign Up</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Login;
