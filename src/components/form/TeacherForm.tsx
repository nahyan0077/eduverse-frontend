import React from "react";
import InputField from "@/components/auth/InputField";
import { Form, Formik, Field, ErrorMessage } from "formik";
import mUser from "@/assets/form/male_user.png";
import teacher_form_image from "@/assets/form/teacher_form.png";
import { useTheme } from "../ui/theme-provider";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLocation, useNavigate } from "react-router-dom";
import teacherFormSchema1 from "@/validationSchemas/teacherFormSchema1";



const TeacherForm: React.FC = () => {
	const { theme } = useTheme();
	const navigate = useNavigate()
	const location = useLocation()

	const initialValues = {
		firstName: "",
		lastName: "",
		userName: "",
		email: "",
		phone: "",
		gender: "",
	};

	const handleSubmit = (value: any) => {
		console.log(value);

		let allData = {
			...location.state,
			firstName: value.firstName,
			lastName: value.lastName,
			gender: value.gender,
			phone: value.phone
		}
		console.log(allData,"all data teacher form");
		

        navigate('/teacher-form2',{state:allData})
	};

	return (
		<>
			<div className="max-w-7xl mx-auto p-5">
				<label
					htmlFor="student form"
					className="text-violet-700 text-xl md:text-3xl font-extrabold px-3"
				>
					<span
						className={`${theme == "dark" ? "text-white" : "text-violet-700"}`}
					>
						Instructor
					</span>{" "}
					Enrollment Form
				</label>

				<div className="flex flex-col md:flex-row items-center">
					<div className="w-full md:w-1/2 mb-4 md:mb-0">
						<img className="w-full h-auto" src={teacher_form_image} alt="" />
					</div>
					<div className="w-full md:w-1/2">
						<div className="mb-4">
							<img className="w-1/5 mx-auto" src={mUser} alt="" />
						</div>
						<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={teacherFormSchema1} >
							<Form>
								<div className="flex flex-col md:flex-row gap-5 px-5 py-2">
									<div className="w-full">
										<InputField
											name="firstName"
											placeholder="first name"
											type="text"
										/>
									</div>
									<div className="w-full">
										<InputField
											name="userName"
											placeholder="user name"
											type="text"
											value={location.state.username}
										/>
									</div>
								</div>
								<div className="flex flex-col md:flex-row gap-5 px-5 py-2">
									<div className="w-full">
									<InputField
											name="lastName"
											placeholder="last name"
											type="text"
										/>
									</div>
									<div className="w-full">
										<InputField
											name="email"
											placeholder="email"
											type="text"
											value={location.state.email}
										/>
									</div>
								</div>
								<div className={`flex flex-col md:flex-row gap-5 px-5 py-2`}>
									<div className="w-full md:w-1/2">
										<InputField
											name="phone"
											placeholder="phone"
											type="text"
										/>
									</div>
									<div className="w-full md:w-1/2">
										<label
											htmlFor="date of birth"
											className="block text-xs font-semibold mb-2"
										>
											GENDER
										</label>
										<Field
											as="select"
											className={`select w-full font-semibold ${
												theme == "light"
													? "bg-gray-200 text-gray-400"
													: "bg-gray-900 text-gray-400 "
											} `}
											name="gender"
										>
											<option value="">select gender</option>
											<option value="male">Male</option>
											<option value="female">Female</option>
											<option value="female">Other</option>
										</Field>
										<ErrorMessage name="gender" className="text-xs font-semibold text-red-500 ml-3" component="span" />
									</div>
									
								</div>
								<div className="flex justify-end p-5 items-center">
									<button
									
										className={`border bg-transparent border-violet-700 text-violet-200 text-sm hover:bg-violet-700 px-2 py-2 rounded-md flex items-center ${
											theme == "light" ? "bg-violet-700" : "bg-gray-900"
										}`}
									>
										NEXT
										<ArrowForwardIcon className="ml-2" fontSize="small" />
									</button>
								</div>
							</Form>
						</Formik>
					</div>
				</div>
			</div>
		</>
	);
};

export default TeacherForm;
