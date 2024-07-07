import React, { useState } from "react";
import InputField from "@/components/common/skeleton/InputField";
import { Form, Formik, Field } from "formik";
import form_image from "@/assets/form/form_img.png";
import { useTheme } from "../ui/theme-provider";
import { useLocation, useNavigate } from "react-router-dom";
import studentFormSchema2 from "../../utils/validationSchemas/studentFormSchema2";
import { SignupFormData } from "@/types/IForms";
import LoadingPopUp from "../common/skeleton/LoadingPopUp";
import { sendVerificationMail, signupAction } from "@/redux/store/actions/auth";
import { useAppDispatch } from "@/hooks/hooks";

const StudentForm2: React.FC = () => {
	const { theme } = useTheme();
	const location = useLocation();

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [isLoading, setLoading] = useState(false);

	const initialValues = {
		address: "",
		dateOfBirth: "",
		profession: "",
		qualification: "",
		social: "",
	};

	const handleSubmit = async (value: any) => {
		setLoading(true);
		console.log(value, "studenr form2 data");
		const allData: SignupFormData = {
			...location.state,
			contact: {
				...location.state.contact,
				address: value.address,
				social: value.social,
			},
			qualification: value.qualification,
			profession: value.profession,
			profile: {
				...location.state.profile,
				dateOfBirth: value.dateOfBirth,
			},
		};

		if (!allData.isGAuth) {
			dispatch(sendVerificationMail(location.state.email));
			setLoading(false);
			navigate("/otp", { state: allData });
		} else {
			console.log("its gAuth", allData);

			await dispatch(signupAction(allData));

			if (allData.role == "student") {
				setLoading(false);
				navigate("/");
			} else {
				setLoading(false);
				navigate("/verification-page");
			}
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
						<Formik
							initialValues={initialValues}
							onSubmit={handleSubmit}
							validationSchema={studentFormSchema2}
						>
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
