// import { TbBulb } from "react-icons/tb";
import login from "@/assets/auth/signups.png";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import Header from "@/components/home/Header";
import { Form, Formik } from "formik";
import InputField from "@/components/auth/InputField";
import {signupSchema} from '@/validationSchemas/signupSchema'
import PasswordField from "@/components/auth/PasswordField";

const SignUp: React.FC = () => {
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
				<div className="flex flex-col md:flex-row max-w-7xl mx-auto items-center">
					<div className="w-full  md:w-1/2">
						<img src={login} alt="" />
					</div>
					<div className="w-full md:w-1/2 p-5">
						<h1 className="text-violet-700 text-3xl font-bold p-4">Sign Up</h1>

						<div className="flex flex-col gap-3  m-2 ">
							<Formik 
							initialValues={initialvalues} 
							onSubmit={handleSubmit}
							validationSchema={signupSchema}
							>
								<Form className="flex flex-col gap-3  m-2 ">
									<InputField
										name="username"
										type="text"
										placeholder="username"
									/>
									<InputField name="email" type="text" placeholder="email" />
									<PasswordField name="password" placeholder="password"  />
									<PasswordField name="confirm password" placeholder="confirm password"  />
									<button
										className="bg-violet-700 text-white font-bold p-2 text-xs rounded-xl m-5"
										type="submit"
									>
										{" "}
										Sign Up{" "}
									</button>
								</Form>
							</Formik>

							<p className="text-violet-700 text-center font-bold">
								Forgot Password?
							</p>
							<div className="border border-gray-200"></div>
							<div className="flex justify-center mt-2">
								<button className="btn bg-white hover:bg-violet-700 text-violet-700 hover:text-white rounded-full border-violet-700 text-xs">
									<GoogleIcon className="text-center  rounded-full " />
									Sign in with google
								</button>
							</div>
							<p
								className="text-center hover:cursor-pointer"
								onClick={() => navigate("/login")}
							>
								Already have an account ?{" "}
								<span className="text-violet-700 font-bold">Login</span>
							</p>
						</div>
						<div></div>
					</div>
				</div>
			</div>
		</>
	);
};
export default SignUp;
