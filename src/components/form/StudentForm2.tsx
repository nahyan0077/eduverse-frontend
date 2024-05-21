import React from "react";
import InputField from "@/components/auth/InputField";
import { Form, Formik } from "formik";
import form_image from "@/assets/form/form_img.png";
import { useTheme } from "../ui/theme-provider";
// import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom'
import studentFormSchema2 from "../../validationSchemas/studentFormSchema2";



const StudentForm2: React.FC = () => {
	const { theme } = useTheme();
	// const navigate = useNavigate()
	const location = useLocation()
	const firstFormData = location.state || {}

	console.log(firstFormData,"first form data...");
	
	const initialValues = {
		address: "",
		dateOfBirth: "",
        profession : "",
        qualification: "",
        social: ""
	};

	const handleSubmit = (value: any) => {
		console.log(value,"studenr form2 data");
		const allData = {
			...value,
			...location.state
		}
		console.log(allData,"final student all data");
		
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
						Student
					</span>{" "}
					Enrollment Form
				</label>
				<div className="flex flex-col md:flex-row items-center">
					<div className="w-full md:w-1/2 mb-4 md:mb-0">
						<img className="w-full h-auto" src={form_image} alt="" />
					</div>
					<div className="w-full md:w-1/2">
						<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={studentFormSchema2} >
							<Form>
								<div className="flex flex-col md:flex-row gap-5 px-5 py-2">
									<div className="w-full">
										<InputField
											name="address"
											placeholder="address"
											type="text"
										/>
									</div>
								</div>
								<div className="flex flex-col md:flex-row gap-5 px-5 py-2">
									<div className="w-full">
                                    <InputField
											name="dateOfBirth"
											placeholder="Date of Birth"
											type="date"
										/>
									</div>
									<div className="w-full">
										<InputField
											name="profession"
											placeholder="profession"
											type="text"
										/>
									</div>
								</div>
								<div className={`flex flex-col md:flex-row gap-5 px-5 py-2`}>
									<div className="w-full md:w-1/2">
										<InputField
											name="qualification"
											placeholder="qualification"
											type="text"
										/>
									</div>
                                    <div className="w-full md:w-1/2">
										<InputField
											name="social"
											placeholder="social"
											type="text"
										/>
									</div>
								</div>
								<div className="flex justify-end p-5 items-center">
									<button
										type="submit"
										className={`border bg-transparent border-violet-700 text-violet-200 text-sm hover:bg-violet-700 px-2 py-2 rounded-md flex items-center ${
											theme == "light" ? "bg-violet-700" : "bg-gray-900"
										}`}
									>
										SUBMIT
										{/* <ArrowForwardIcon className="ml-2" fontSize="small" /> */}
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

export default StudentForm2;
