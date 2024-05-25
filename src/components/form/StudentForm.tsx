import React from "react";
import InputField from "@/components/auth/InputField";
import { Form, Formik, Field, ErrorMessage } from "formik";
import form_image from "@/assets/form/form_img.png";
import { useTheme } from "../ui/theme-provider";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLocation, useNavigate } from "react-router-dom";
import studentFormSchema from "@/validationSchemas/studentFormSchema";
import { SignupFormData } from "@/types/IForms";
import { motion } from "framer-motion";

const StudentForm: React.FC = () => {
	const { theme } = useTheme();
	const navigate = useNavigate();
	const location = useLocation();

	const initialValues = {
		firstName: "",
		lastName: "",
		userName: "",
		email: "",
		phone: "",
		gender: "",
	};

	const handleSubmit = (value: any) => {
		console.log(value, "student form data");

		let allData: SignupFormData = {
			...location.state,
			firstName: value.firstName,
			lastName: value.lastName,
			gender: value.gender,
			phone: value.phone,
		};
		console.log(allData, "all data student form");

		navigate("/student-form2", { state: allData });
	};

	return (
		<div className="max-w-7xl mx-auto p-5">
			<label
				htmlFor="student form"
				className="text-violet-700 text-xl md:text-3xl font-extrabold px-3"
			>
				<span
					className={`${theme == "dark" ? "text-white" : "text-violet-700"}`}
				>
					Student
				</span>{" "}
				Enrollment Form
			</label>

			<div className="flex flex-col md:flex-row items-center mt-5">
				<motion.div
					className="w-full md:w-1/2 mb-4 md:mb-0"
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
				>
					<img className="w-full h-auto" src={form_image} alt="Form" />
				</motion.div>
				<motion.div
					className="w-full md:w-1/2"
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
				>
					<div className="mb-4">
						<img className="w-1/5 mx-auto rounded-full" src="https://www.pngkey.com/png/detail/72-729716_user-avatar-png-graphic-free-download-icon.png" alt="User" />
					</div>
					<Formik
						initialValues={initialValues}
						onSubmit={handleSubmit}
						validationSchema={studentFormSchema}
					>
						<Form>
							<div className="flex flex-col md:flex-row gap-5 px-5 py-2">
								<div className="w-full">
									<InputField
										name="firstName"
										placeholder="First Name"
										type="text"
									/>
								</div>
								<div className="w-full">
									<InputField
										name="userName"
										placeholder="User Name"
										type="text"
										value={location.state?.username || ""}
									/>
								</div>
							</div>
							<div className="flex flex-col md:flex-row gap-5 px-5 py-2">
								<div className="w-full">
									<InputField
										name="lastName"
										placeholder="Last Name"
										type="text"
									/>
								</div>
								<div className="w-full">
									<InputField
										name="email"
										placeholder="Email"
										type="email"
										value={location.state?.email || ""}
									/>
								</div>
							</div>
							<div className="flex flex-col md:flex-row gap-5 px-5 py-2">
								<div className="w-full md:w-1/2">
									<InputField name="phone" placeholder="Phone" type="text" />
								</div>
								<div className="w-full md:w-1/2">
									<label
										htmlFor="gender"
										className="block text-xs font-semibold mb-2"
									>
										GENDER
									</label>
									<Field
										as="select"
										className={`select w-full font-semibold ${
											theme === "light"
												? "bg-gray-200 text-gray-400"
												: "bg-gray-900 text-gray-400"
										}`}
										name="gender"
									>
										<option value="">Select Gender</option>
										<option value="male">Male</option>
										<option value="female">Female</option>
										<option value="other">Other</option>
									</Field>
									<ErrorMessage
										name="gender"
										className="text-xs font-semibold text-red-500 ml-3"
										component="span"
									/>
								</div>
							</div>
							<div className="flex justify-end p-5 items-center">
								<motion.button
									type="submit"
									className={`border bg-transparent border-violet-700 text-violet-200 text-sm hover:bg-violet-700 px-2 py-2 rounded-md flex items-center ${
										theme === "light" ? "bg-violet-700" : "bg-gray-900"
									}`}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									NEXT
									<ArrowForwardIcon className="ml-2" fontSize="small" />
								</motion.button>
							</div>
						</Form>
					</Formik>
				</motion.div>
			</div>
		</div>
	);
};

export default StudentForm;
