import { CustomImageFileInput } from "@/components/fileInputs/imageInput";
import { CustomVideoFileInput } from "@/components/fileInputs/videoInput";
import { RootState } from "@/redux/store";
import { CourseFirst } from "@/types/ICourse";
import { addCourseValidationSchema1 } from "@/validationSchemas/addCourseSchema1";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



export const AddCourse: React.FC = () => {
	const category = useSelector((state: RootState) => state.category);
	const [pricing, setPricing] = useState<string>("free");
	const navigate = useNavigate()

	const initialValues: CourseFirst = {
		title: "",
		description: "",
		thumbnail: "",
		language: "",
		pricing: "free",
		category: "",
        video: ""
	};

	const handleSubmit = (values: CourseFirst) => {

		const allData = {
			...values,
			pricing: pricing
		}

		console.log(allData,"first form all data");
		

		navigate('/instructor/add-lessons',{state: {allData}})
	};

	const handlePricingChange = (value: string) => {
		console.log(value,"price change value");
		
		setPricing(value);
	};

	return (
		<div className="max-w-full mx-auto py-10 px-14 text-white rounded-xl ">
			<div className="mb-10">
				<h1 className="text-3xl font-bold">Add Course</h1>
			</div>
			<Formik
				initialValues={initialValues}
				validationSchema={addCourseValidationSchema1}
				onSubmit={handleSubmit}
			>
				{({ setFieldValue, errors, touched }) => (
					<Form>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-5">
							<div className="space-y-6">
								<div>
									<label className="block mb-2 font-semibold">
										Course Thumbnail
									</label>
									<CustomImageFileInput
										onChange={(file) => setFieldValue("thumbnail", file)}
										theme="dark"
									/>
									{errors.thumbnail && touched.thumbnail && (
										<div className="text-red-500 text-sm mt-1">
											{errors.thumbnail}
										</div>
									)}
								</div>

								<div>
									<label className="block mb-2 font-semibold">Course Title</label>
									<Field
										name="title"
										type="text"
										placeholder="Course Title"
										className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
									/>
									{errors.title && touched.title && (
										<div className="text-red-500 text-sm mt-1">
											{errors.title}
										</div>
									)}
								</div>
								<div>
									<label className="block mb-2 font-semibold">Description</label>
									<Field
										name="description"
										as="textarea"
										placeholder="Description"
										className="w-full p-3 bg-gray-800 border border-gray-700 rounded h-32"
									/>
									{errors.description && touched.description && (
										<div className="text-red-500 text-sm mt-1">
											{errors.description}
										</div>
									)}
								</div>
                                <div>
									<label className="block mb-2 font-semibold">Language</label>
									<Field
										as="select"
										name="language"
										className={`select w-full font-semibold bg-gray-800`}
									>
										<option disabled value="">
											Language
										</option>
										<option value="english">English</option>
									</Field>
									{errors.language && touched.language && (
										<div className="text-red-500 text-sm mt-1">
											{errors.language}
										</div>
									)}
								</div>
								
							</div>
							<div className="space-y-8">
                            <div>
									<label className="block mb-2 font-semibold">
										Course Demo Video
									</label>
									<CustomVideoFileInput
										onChange={(file) => setFieldValue("video", file)}
										theme="dark"
									/>
									{errors.video && touched.video && (
										<div className="text-red-500 text-sm mt-1">
											{errors.video}
										</div>
									)}
								</div>

                                <div>
									<label className="block mb-2 font-semibold">Category</label>
									<Field
										as="select"
										name="category"
										className={`select w-full font-semibold bg-gray-800`}
									>
										<option disabled value="">
											Select Category
										</option>
										{category.data.map((data) => (
											<option key={data.categoryName} value={data._id}>
												{data.categoryName}
											</option>
										))}
									</Field>
									{errors.category && touched.category && (
										<div className="text-red-500 text-sm mt-1">
											{errors.category}
										</div>
									)}
								</div>
								
								<div>
									<label className="block mb-2 font-semibold">Pricing</label>
									<div className="flex space-x-4">
										<button
											type="button"
											className={`btn  btn-lg w-1/2 ${
												pricing === "free" ? "btn-success" : ""
											}`}
											onClick={() => handlePricingChange("free")}
										>
											Free
										</button>
										<button
											type="button"
											className={`btn  btn-lg w-1/2 ${
												pricing === "paid" ? "btn-error" : ""
											}`}
											onClick={() => handlePricingChange("paid")}
										>
											Paid
										</button>
									</div>
									{errors.pricing && touched.pricing && (
										<div className="text-red-500 text-sm mt-1">
											{errors.pricing}
										</div>
									)}
								</div>
								<button type="submit" className="btn btn-primary w-full mt-10">
									Add Lessons
								</button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
