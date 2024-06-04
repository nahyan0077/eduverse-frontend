import React from "react";
import InputField from "@/components/common/skeleton/InputField";
import { ErrorMessage, Form, Formik, Field } from "formik";
import { useTheme } from "../ui/theme-provider";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export const StudentProfile: React.FC = () => {
	const initialValues = {
		userName: "",
		email: "",
		firstName: "",
		lastName: "",
		phone: "",
		address: "",
		dateOfBirth: "",
		gender: "",
		qualification: "",
		social: "",
	};

	const { data } = useAppSelector((state: RootState) => state.user);

	const { theme } = useTheme();

	const handleSubmit = () => {};
	const handleEdit = () => {};
	const handleSave = () => {};

	const [value, setValue] = React.useState("1");

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

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
											<button className="btn btn-outline btn-sm btn-info ">
												edit{" "}
											</button>
										</div>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<div className="w-full">
												<InputField
													name="userName"
													placeholder="User Name"
													type="text"
													value={data?.userName}
												/>
											</div>

											<div className="w-full">
												<InputField
													name="email"
													placeholder="Email"
													type="email"
													value={data?.email}
												/>
											</div>

											<div className="w-full">
												<InputField
													name="firstName"
													placeholder="First Name"
													type="text"
													value={data?.firstName}
												/>
											</div>

											<div className="w-full">
												<InputField
													name="lastName"
													placeholder="Last Name"
													type="text"
													value={data?.lastName}
												/>
											</div>

											<div className="w-full">
												<InputField
													name="phone"
													placeholder="phone"
													type="text"
													value={data?.contact?.phone}
												/>
											</div>

											<div className="w-full">
												<InputField
													name="address"
													placeholder="address"
													type="text"
													value={data?.contact?.address}
												/>
											</div>
										</div>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
											<div className="w-full">
												<InputField
													name="dateOfBirth"
													placeholder="Date of Birth"
													type="date"
													value={data?.profile?.dateOfBirth}
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
										<div className="mt-6 text-end">
											<button
												onClick={handleSave}
												type="submit"
												className="btn btn-outline btn-accent btn-md"
											>
												Submit
											</button>
											<button
												onClick={handleEdit}
												type="submit"
												className="btn btn-outline btn-warning btn-md"
											>
												Edit
											</button>
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
