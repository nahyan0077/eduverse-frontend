import { ErrorMessage, Form, Formik, Field } from "formik";
import React, { useState } from "react";
import InputField from "@/components/common/skeleton/InputField";
import { useTheme } from "../ui/theme-provider";
import { addCategorySchema } from "@/validationSchemas/addCategorySchema";
import { addCategory } from "@/types/ICategory";
import { useAppDispatch } from "@/hooks/hooks";
import { addCategoryAction } from "@/redux/store/actions/category";

// Sample data, this could be fetched from an API


export const AdminCategory: React.FC = () => {

	const [isModalOpen, setIsModalOpen] = useState(false);
    const disptch = useAppDispatch()
	const { theme } = useTheme();

	const initialValues = {
        categoryName: "",
        status: ""
    };

	const handleAddCategory = async (values:addCategory ) => {
        console.log(values,"categfory valu");
        const response = await disptch(addCategoryAction({categoryName: values.categoryName, status: values.status}))

        console.log(response,"add category response");
        

        setIsModalOpen(false)
	};

	return (
		<div className="max-w-7xl mx-auto items-center p-4 py-10">
			<div className="flex justify-between mb-6">
				<h2 className="font-bold text-3xl">Categories</h2>
				<button
					className="btn btn-warning btn-outline"
					onClick={() => setIsModalOpen(true)}
				>
					Add Category
				</button>
			</div>
			<table className="table-auto w-full mt-10">
				<thead className="text-lg uppercase bg-gray-800">
					<tr>
						<th className="px-4 py-2">Si.No</th>
						<th className="px-4 py-2">Name</th>
						<th className="px-4 py-2">Status</th>
						<th className="px-4 py-2">Actions</th>
					</tr>
				</thead>
				<tbody className="text-center " >
		
						<tr key='' className="border-t">
							<td className="px-4 py-2">1</td>
							<td className="px-4 py-2">categ 1</td>
							<td className="px-4 py-2">active</td>
							<td className="px-4 py-2 space-x-4">
								<button className="btn btn-outline btn-accent">
									Edit
								</button>
								<button className="btn btn-outline btn-error">
									Block
								</button>
							</td>
						</tr>

				</tbody>
			</table>

			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black  bg-opacity-80 ">
					<div className="bg-gray-950  p-6 rounded-lg shadow-lg w-full max-w-2xl">
						<h2 className="text-xl font-bold mb-8">Add New Category</h2>

						<Formik initialValues={initialValues} onSubmit={handleAddCategory} validationSchema={addCategorySchema} >
							<Form>
                                <div className="flex flex-col gap-8" >

								<div className="w-full">
									<InputField
										name="categoryName"
										placeholder="Category Name"
										type="text"
									/>
								</div>
								<div className="w-full mb-8">
									<label
										htmlFor="status"
										className="block text-xs font-semibold mb-2"
									>
										ACTIVE/BLOCKED
									</label>
									<Field
										as="select"
										className={`select w-full font-semibold ${
											theme === "light"
												? "bg-gray-200 text-gray-400"
												: "bg-gray-900 text-gray-400"
										}`}
										name="status"
									>
										<option value="">Select Status</option>
										<option value="active">Active</option>
										<option value="blocked">Blocked</option>
									</Field>
									<ErrorMessage
										name="status"
										className="text-xs font-semibold text-red-500 ml-3"
										component="span"
									/>
								</div>
                                </div>
                                <div className="flex space-x-3 justify-end" >

								<button
									type="submit"
									className=" btn btn-success btn-outline btn-md "
								>
									Add
								</button>
								<button
									className="btn btn-error btn-outline btn-md "
									onClick={() => setIsModalOpen(false)}
								>
									Cancel
								</button>
                                </div>
							</Form>
						</Formik>
					</div>
				</div>
			)}
		</div>
	);
};
