import login from "@/assets/auth/signups.png";
import GoogleIcon from "@mui/icons-material/Google";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/home/Header";
import { Form, Formik } from "formik";
import InputField from "@/components/auth/InputField";
import { signupSchema } from "@/validationSchemas/signupSchema";
import PasswordField from "@/components/auth/PasswordField";
import { useDispatch } from "react-redux";
// import { tempSignUpData } from "@/redux/store/slices/user";
import {
	findEmailAction,
	findUsernameAction,
} from "@/redux/store/actions/auth";
import { TypeDispatch } from "@/redux/store";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { useTheme } from "@/components/ui/theme-provider";

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

	const dispatch: TypeDispatch = useDispatch();

	const [isEmailTaken, setTakenEmail] = useState(false);
	const [isUsernameTaken, setTakenUsername] = useState(false);

	const handleSubmit = async (data: any) => {
		setTakenEmail(false);
		setTakenUsername(false);
		// dispatch(tempSignUpData(data));

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

			let allData = {
				...data,
				role: location.state.role
			}
			
			console.log("alldata",allData);

			if (location.state.role == "student") {
				navigate("/student-form",{state: allData});
			}else{
				navigate("/teacher-form",{state: allData});
			}
			

		} catch (error: any) {
			throw new Error(error?.message);
		}
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
								Signup
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
								Signup
							</h1>
						)}
						{isEmailTaken && (
							<Alert variant="outlined" severity="error">
								Email is already exist, please login
							</Alert>
						)}
						{isUsernameTaken && (
							<Alert variant="outlined" severity="error">
								Username is already taken
							</Alert>
						)}
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
									<InputField name="email" type="email" placeholder="email" />
									<PasswordField name="password" placeholder="password" />
									<PasswordField
										name="confirmPassword"
										placeholder="confirm password"
									/>
									<button
										className="bg-violet-700 text-white font-bold p-2 text-sm rounded-md mt-3"
										type="submit"
									>
										{" "}
										Sign Up{" "}
									</button>
								</Form>
							</Formik>

							<div className="flex justify-center">
									<div className="">
										<p
											className="text-center text-sm hover:cursor-pointer ml-2"
											onClick={() =>
												navigate("/login", { state:{ location }})
											}
										>
											Don't have an account ?{" "}
											<span className="text-violet-700 font-bold">Login</span>
										</p>
									</div>
									
								</div>

							<div className="flex justify-center mt-2">
								<button className="btn bg-white hover:bg-violet-700 text-violet-700 hover:text-white rounded-full border-violet-700 text-xs px-4 py-1">
									<GoogleIcon className="text-center rounded-full " />
									Sign in with google
								</button>
							</div>
							
						</div>
						<div></div>
					</div>
				</div>
			</div>
		</>
	);
};
export default SignUp;
