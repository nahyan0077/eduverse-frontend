import React, { useState } from "react";
import InputField from "@/components/common/skeleton/InputField";
import { ErrorMessage, Form, Formik, Field } from "formik";
import { useTheme } from "../ui/theme-provider";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { updateProfileAction } from "@/redux/store/actions/user/updateProfileAction";

export const StudentProfile: React.FC = () => {

	const { data } = useAppSelector((state: RootState) => state.user);
	const [isEditting, setIseditting] = useState(true)
	const dispatch = useAppDispatch()

	const initialValues = {
		userName: data?.userName || '',
		email: data?.email || '',
		firstName: data?.firstName || '',
		lastName: data?.lastName || '',
		phone: data?.contact?.phone || '',
		address: data?.contact?.address || '',
		dateOfBirth: data?.profile?.dateOfBirth || '',
		gender: data?.profile?.gender || '',
		qualification: data?.qualification || '',
	};
	const { theme } = useTheme();

	const handleSubmit = () => { };
	const handleEdit = () => {
		setIseditting(!isEditting)
	};
	const handleSave = async () => {
		// const response = await updateProfileAction()
	};

	const [value, setValue] = React.useState("1");

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	const inputStyle = `w-full px-5 py-3 rounded-lg  font-medium border-2 ${theme === 'light' ? "bg-gray-200 text-gray-600" : "bg-gray-900 text-gray-300"} border-transparent  text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100`

	return (
		<>
			<div className="flex justify-center mt-4 max-w-7xl mx-auto" >


				<Box sx={{ width: "80%", typography: "body1" }}>
					<TabContext value={value}>
						<Box sx={{ borderBottom: 1, borderColor: 'Menu' }}>
							<TabList onChange={handleChange} aria-label="lab API tabs example" textColor="inherit" >
								<Tab label="Profile" value="1" />
								<Tab label="Reset Password" value="2" />
								<Tab label="Item Three" value="3" />
							</TabList>
						</Box>
						<TabPanel value="1">
							<Formik onSubmit={handleSubmit} initialValues={initialValues}>
								<Form>
									<div className="min-h-screen  flex items-center justify-center -mt-24">
										<div className=" p-8 rounded-lg shadow-lg w-full max-w-7xl">
											<div className="flex flex-col gap-3 items-center justify-center mb-4">
												<img
													className="w-[30%] md:w-[8%] mx-auto rounded-full"
													src={data?.profile?.avatar}
													alt="User"
												/>
												{
													!isEditting &&
													<button className="btn btn-outline btn-sm btn-info ">
														edit{" "}
													</button>
												}
											</div>
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
												<div className="w-full">
													<label htmlFor="username" className="block text-xs font-semibold mb-2">USER NAME</label>
													<Field
														className={inputStyle}
														name="userName"
														placeholder="User Name"
														type="text"
														disabled={isEditting}
													/>
													<ErrorMessage
														name="userName"
														className="text-xs font-semibold text-red-500 ml-3"
														component="span"
													/>
												</div>

												<div className="w-full">
													<label htmlFor="username" className="block text-xs font-semibold mb-2">EMAIL</label>
													<Field
														className={inputStyle}
														name="email"
														placeholder="Email"
														type="email"
														disabled={isEditting}
													/>
													<ErrorMessage
														name="email"
														className="text-xs font-semibold text-red-500 ml-3"
														component="span"
													/>
												</div>

												<div className="w-full">
													<label htmlFor="username" className="block text-xs font-semibold mb-2">FIRST NAME</label>
													<Field
														className={inputStyle}
														name="firstName"
														placeholder="First Name"
														type="text"
														disabled={isEditting}
													/>
													<ErrorMessage
														name="firstName"
														className="text-xs font-semibold text-red-500 ml-3"
														component="span"
													/>
												</div>

												<div className="w-full">
													<label htmlFor="username" className="block text-xs font-semibold mb-2">LAST NAME</label>
													<Field
														className={inputStyle}
														name="lastName"
														placeholder="Last Name"
														type="text"
														disabled={isEditting}
													/>
													<ErrorMessage
														name="lastName"
														className="text-xs font-semibold text-red-500 ml-3"
														component="span"
													/>
												</div>

												<div className="w-full">
													<label htmlFor="username" className="block text-xs font-semibold mb-2">PHONE</label>
													<Field
														className={inputStyle}
														name="phone"
														placeholder="phone"
														type="text"
														disabled={isEditting}
													/>
													<ErrorMessage
														name="phone"
														className="text-xs font-semibold text-red-500 ml-3"
														component="span"
													/>
												</div>

												<div className="w-full">
													<label htmlFor="username" className="block text-xs font-semibold mb-2">ADDRESS</label>
													<Field
														className={inputStyle}
														name="address"
														placeholder="address"
														type="text"
														disabled={isEditting}
													/>
													<ErrorMessage
														name="address"
														className="text-xs font-semibold text-red-500 ml-3"
														component="span"
													/>
												</div>
											</div>
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
												<div className="w-full">
													<label htmlFor="username" className="block text-xs font-semibold mb-2">DATE OF BIRTH</label>
													<Field
														className={inputStyle}
														name="dateOfBirth"
														placeholder="Date of Birth"
														type="date"
														disabled={isEditting}
													/>
													<ErrorMessage
														name="dateOfBirth"
														className="text-xs font-semibold text-red-500 ml-3"
														component="span"
													/>
												</div>

												<div className="w-full ">
													<label
														htmlFor="gender"
														className="block text-xs font-semibold mb-2"
													>
														GENDER
													</label>
													<Field
														as="select"
														className={`select w-full font-semibold ${theme === "light"
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
											<div className="mt-6 text-end">
												{
													!isEditting &&

													<button
														onClick={handleSave}
														type="submit"
														className="btn btn-outline btn-accent btn-sm"
													>
														Submit
													</button>

												}

												{
													isEditting &&

													<button
														onClick={handleEdit}
														type="submit"
														className="btn btn-outline btn-warning btn-sm"
													>
														Edit
													</button>

												}
											</div>
										</div>
									</div>
								</Form>
							</Formik>
						</TabPanel>
						<TabPanel value="2" >

						</TabPanel>
					</TabContext>
				</Box>
			</div>
		</>
	);
};
