import React, { useState } from "react";
import InputField from "@/components/auth/InputField";
import { Form, Formik, Field } from "formik";
import form_image from "@/assets/form/form_img.png";
import { useTheme } from "../ui/theme-provider";
// import { useNavigate } from "react-router-dom";
import {useLocation, useNavigate} from 'react-router-dom'
import studentFormSchema2 from "../../validationSchemas/studentFormSchema2";
import { signupAction } from "@/redux/store/actions/auth";
import { SignupFormData } from "@/types/IForms";
import { useAppDispatch } from "@/hooks/hooks";
import { sendVerificationMail } from "@/redux/store/actions/auth/sendVerificaitionMail";
import LoadingPopUp from "../common/skeleton/LoadingPopUp";



const StudentForm2: React.FC = () => {
	const { theme } = useTheme();
	// const navigate = useNavigate()
	const location = useLocation()
	const firstFormData = location.state || {}

	const navigate = useNavigate()
	const [isLoading,setLoading] = useState(false)

	console.log(firstFormData,"first form data...");
	
	const initialValues = {
		address: "",
		dateOfBirth: "",
        profession : "",
        qualification: "",
        social: ""
	};

	const dispatch = useAppDispatch();

	const handleSubmit = async (value: any) => {

		setLoading(true)
		
		console.log(value,"studenr form2 data");
		const allData: SignupFormData  = {
			...value,
			...location.state
		}
		console.log(allData,"final student all data");

		const response: any = await dispatch(signupAction(allData ))
		console.log("signup final ress",response);
		
		setLoading(false)
		
		if(!response.payload.data.isGAuth){
			const response1 = await dispatch(sendVerificationMail())
			console.log(response1,"noteif mail");
			navigate('/otp')
		}else{
			console.log("its gAuth");
			
		}
		
	};

	return (
		<>
			<LoadingPopUp isLoading={isLoading} />
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
									<div className="w-full ">
										<label
											htmlFor="date of birth"
											className="block text-xs font-semibold mb-2"
										>
											PROFESSION
										</label>
										<Field
											as="select"
											className={`select w-full font-semibold ${
												theme == "light"
													? "bg-gray-200 text-gray-400"
													: "bg-gray-900 text-gray-400 "
											} `}
											name="profession"
										>
											<option value="">select profession</option>
											<option value="student">Student</option>
											<option value="working">Working</option>
										</Field>
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
