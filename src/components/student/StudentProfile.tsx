import React, { useEffect, useRef, useState } from "react";
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
import { Toaster, toast } from "sonner";
import { ImageUpload } from "@/utils/cloudinary/uploadImage";
import { editProfileValidationSchema } from "@/validationSchemas/editProfileSchema";

export const StudentProfile: React.FC = () => {
	const { data } = useAppSelector((state: RootState) => state.user);
	const [isEditing, setIsEditing] = useState(true);
	const dispatch = useAppDispatch();
	const [userId, setUserId] = useState<string | null>("");
	useEffect(() => {
		setUserId(data?._id || null);
	}, [data]);

	const initialValues = {
		email: data?.email || "",
		firstName: data?.firstName || "",
		lastName: data?.lastName || "",
		phone: data?.contact?.phone || "",
		address: data?.contact?.address || "",
		dateOfBirth: data?.profile?.dateOfBirth || "",
		gender: data?.profile?.gender || "",
		qualification: data?.qualification || "",
		profession: data?.profession || "",
		social: data?.contact?.social || "",
		avatar: data?.profile?.avatar || "",
	};

	const { theme } = useTheme();

	const handleSubmit = async (
		values: typeof initialValues,
		{ setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
	) => {
		if (file) {
			const avatarUrl = await ImageUpload(file);
			if (avatarUrl) {
				values.avatar = avatarUrl;
			} else {
				toast.error("Failed to upload avatar. Please try again.");
				setSubmitting(false);
				return;
			}
		}
		console.log(values, "valuesss");

		const data = {
			...values,
			_id: userId,
			profile: {
				dateOfBirth: values.dateOfBirth,
				gender: values.gender,
				avatar: values.avatar,
			},
			contact: {
				address: values.address,
				phone: values.phone,
				social: values.social,
			},
		};

		const response = await dispatch(updateProfileAction(data));

		console.log(response, "profile update data");

		if (!response.payload.success) {
			setIsEditing(true);
			setSubmitting(false);
			toast.error("Profile updation failed.");
		} else {
			toast.success("Profile updated successfully.");
		}
	};

	const handleEdit = () => {
		toast.info("Click on submit to update profile");
		setIsEditing(!isEditing);
	};

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const [value, setValue] = React.useState("1");

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	const [file, setFile] = useState<File | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setFile(event.target.files[0]);
		}
	};

	const fileInputRef = useRef<HTMLInputElement>(null);

	const inputStyle = `w-full px-5 py-3 rounded-lg font-medium border-2 ${
		theme === "light"
			? "bg-gray-200 text-gray-600"
			: "bg-gray-900 text-gray-300"
	} border-transparent text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100`;

	return (
		<>
			<div className="flex justify-center mt-4 max-w-7xl mx-auto">
				<Toaster richColors position="top-center" />
				<Box sx={{ width: "80%", typography: "body1" }}>
					<TabContext value={value}>
						<Box sx={{ borderBottom: 1, borderColor: "Menu" }}>
							<TabList
								onChange={handleChange}
								aria-label="lab API tabs example"
								textColor="inherit"
							>
								<Tab label="Profile" value="1" />
								<Tab label="Reset Password" value="2" />
								<Tab label="Item Three" value="3" />
							</TabList>
						</Box>
						<TabPanel value="1">
							<Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={editProfileValidationSchema} > 
								{({ isSubmitting }) => (
									<Form>
										<div className="min-h-screen flex items-center justify-center -mt-24">
											<div className="p-8 rounded-lg shadow-lg w-full max-w-7xl">
												<div className="flex flex-col gap-3 items-center justify-center mb-4">
													<img
														className="object-cover w-28 h-28 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
														src={
															file
																? URL.createObjectURL(file)
																: data?.profile?.avatar
														}
														alt="User"
													/>
													<input
														type="file"
														ref={fileInputRef}
														accept="image/*"
														onChange={handleFileChange}
														className="mt-2 hidden"
														disabled={isEditing}
													/>
													{!isEditing && (
														<button
															className="btn btn-outline btn-sm btn-info"
															type="button"
															onClick={handleButtonClick}
														>
															Edit
														</button>
													)}
												</div>
												<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
													<div className="w-full">
														<label
															htmlFor="username"
															className="block text-xs font-semibold mb-2"
														>
															USER NAME
														</label>
														<Field
															className={inputStyle}
															name="userName"
															placeholder="User Name"
															type="text"
															disabled
														/>
													</div>

													<div className="w-full">
														<label
															htmlFor="username"
															className="block text-xs font-semibold mb-2"
														>
															EMAIL
														</label>
														<Field
															className={inputStyle}
															name="email"
															placeholder="Email"
															type="email"
															disabled={isEditing}
														/>
														<ErrorMessage
															name="email"
															className="text-xs font-semibold text-red-500 ml-3"
															component="span"
														/>
													</div>

													<div className="w-full">
														<label
															htmlFor="username"
															className="block text-xs font-semibold mb-2"
														>
															FIRST NAME
														</label>
														<Field
															className={inputStyle}
															name="firstName"
															placeholder="First Name"
															type="text"
															disabled={isEditing}
														/>
														<ErrorMessage
															name="firstName"
															className="text-xs font-semibold text-red-500 ml-3"
															component="span"
														/>
													</div>

													<div className="w-full">
														<label
															htmlFor="username"
															className="block text-xs font-semibold mb-2"
														>
															LAST NAME
														</label>
														<Field
															className={inputStyle}
															name="lastName"
															placeholder="Last Name"
															type="text"
															disabled={isEditing}
														/>
														<ErrorMessage
															name="lastName"
															className="text-xs font-semibold text-red-500 ml-3"
															component="span"
														/>
													</div>

													<div className="w-full">
														<label
															htmlFor="username"
															className="block text-xs font-semibold mb-2"
														>
															PHONE
														</label>
														<Field
															className={inputStyle}
															name="phone"
															placeholder="Phone"
															type="text"
															disabled={isEditing}
														/>
														<ErrorMessage
															name="phone"
															className="text-xs font-semibold text-red-500 ml-3"
															component="span"
														/>
													</div>

													<div className="w-full">
														<label
															htmlFor="username"
															className="block text-xs font-semibold mb-2"
														>
															ADDRESS
														</label>
														<Field
															className={inputStyle}
															name="address"
															placeholder="Address"
															type="text"
															disabled={isEditing}
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
														<label
															htmlFor="username"
															className="block text-xs font-semibold mb-2"
														>
															DATE OF BIRTH
														</label>
														<Field
															className={inputStyle}
															name="dateOfBirth"
															placeholder="Date of Birth"
															type="date"
															disabled={isEditing}
														/>
														<ErrorMessage
															name="dateOfBirth"
															className="text-xs font-semibold text-red-500 ml-3"
															component="span"
														/>
													</div>

													<div className="w-full">
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
															disabled={isEditing}
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

													<div className="w-full">
														<label
															htmlFor="profession"
															className="block text-xs font-semibold mb-2"
														>
															PROFESSION
														</label>
														<Field
															className={inputStyle}
															name="profession"
															placeholder="Profession"
															type="text"
															disabled={isEditing}
														/>
														<ErrorMessage
															name="profession"
															className="text-xs font-semibold text-red-500 ml-3"
															component="span"
														/>
													</div>

													<div className="w-full">
														<label
															htmlFor="social"
															className="block text-xs font-semibold mb-2"
														>
															SOCIAL
														</label>
														<Field
															className={inputStyle}
															name="social"
															placeholder="Social"
															type="text"
															disabled={isEditing}
														/>
														<ErrorMessage
															name="social"
															className="text-xs font-semibold text-red-500 ml-3"
															component="span"
														/>
													</div>
												</div>
												<div className="mt-6 text-end">
													{!isEditing && (
														<button
															type="submit"
															className="btn btn-outline btn-accent btn-sm"
															disabled={isSubmitting}
														>
															Submit
														</button>
													)}
													{isEditing && (
														<button
															type="button"
															onClick={handleEdit}
															className="btn btn-outline btn-warning btn-sm"
														>
															Edit
														</button>
													)}
												</div>
											</div>
										</div>
									</Form>
								)}
							</Formik>
						</TabPanel>
						<TabPanel value="2">
							{/* Add content for "Reset Password" tab here */}
						</TabPanel>
					</TabContext>
				</Box>
			</div>
		</>
	);
};
