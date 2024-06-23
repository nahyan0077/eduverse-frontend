import { ErrorMessage, Form, Formik, Field } from "formik";
import React, { useEffect, useState } from "react";
import InputField from "@/components/common/skeleton/InputField";
import { useTheme } from "../ui/theme-provider";
import { addCategorySchema } from "@/validationSchemas/addCategorySchema";
import { addCategory } from "@/types/ICategory";
import { useAppDispatch } from "@/hooks/hooks";
import {
	addCategoryAction,
	getAllCategories,
} from "@/redux/store/actions/category";
import { Toaster, toast } from "sonner";
import LoadingPopUp from "../common/skeleton/LoadingPopUp";
import { editCategoryAction } from "@/redux/store/actions/category/editCategoryAction";
import { SearchBar } from "../common/admin/SearchBar";

interface Categories {
	_id: string;
	categoryName: string;
	status: string;
	createdAt: string;
}

export const AdminCategory: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const dispatch = useAppDispatch();
	const { theme } = useTheme();
	const [categories, setCategories] = useState<Categories[]>([]);
	const [loading, setLoading] = useState(true);
	const [editCategory, setEditCategory] = useState<Categories | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	

	// Pagination states
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const initialValues = {
		categoryName: "",
		status: "",
	};

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await dispatch(getAllCategories());
				console.log(response, "fetching category data");

				if (getAllCategories.fulfilled.match(response)) {
					setCategories(response.payload.data);
				} else {
					toast.error("Failed to fetch data");
				}
			} catch (error: any) {
				toast.error(error.message || "An error occurred");
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, [dispatch, searchQuery]);

	console.log(categories, "categories");

	const handleAddCategory = async (values: addCategory) => {
		try {
			const response = await dispatch(
				addCategoryAction({
					categoryName: values.categoryName,
					status: values.status,
				})
			);

			console.log(response, "add category response");

			if (response.meta.requestStatus === "fulfilled") {
				toast.success("Category added successfully");
				setCategories([...categories, response.payload.data]);
				setIsModalOpen(false);
			} else if (response.meta.requestStatus === "rejected") {
				toast.error(response?.payload || "Failed to add category");
			}
		} catch (error: any) {
			toast.error(error.message || "An error occurred");
		}
	};

	if (loading) {
		return <LoadingPopUp isLoading={loading} />;
	}

	// Pagination calculation
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(categories.length / itemsPerPage);

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const handleEditCategory = (data: Categories) => {
		setEditCategory(data);
		setIsEditModalOpen(true);
	};

	const handleSubmitEditCategory = async (values: {
		categoryName: string;
		status: string;
	}) => {
		try {
			if (editCategory) {
				const response = await dispatch(
					editCategoryAction({
						_id: editCategory?._id,
						categoryName: values?.categoryName,
						status: values?.status,
					})
				);

				if (response.meta.requestStatus == "fulfilled") {
					setCategories(
						categories.map((category) =>
							category._id === editCategory._id
								? response.payload.data
								: category
						)
					);
					toast.success("Category edited successfully..!");
					setIsEditModalOpen(false);
				} else if (response.meta.requestStatus == "rejected") {
					toast.error(response.payload || "Failed to edit category");
				}
			}
		} catch (error: any) {
			toast.error(error.message || "An error occurred");
		}
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value)
		console.log(searchQuery);
		
	}

	return (
		<div className="max-w-full mx-auto items-center px-20 py-20">
			<Toaster richColors position="top-center" />
			<div className="flex justify-between mb-6">
				<h2 className="font-bold text-3xl">Categories</h2>
				<button
					className="btn btn-warning btn-outline"
					onClick={() => setIsModalOpen(true)}
				>
					Add Category
				</button>
			</div>
			{/* <------------------- search -----------------> */}

			<div className="flex justify-end items-center">
				<div>
					<SearchBar onSearchChange={handleSearchChange} />
				</div>
			</div>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 px-20">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
						<tr className="text-center">
							<th scope="col" className="px-6 py-3">
								Si.No
							</th>
							<th scope="col" className="px-6 py-3">
								Name
							</th>
							<th scope="col" className="px-6 py-3">
								Status
							</th>
							<th scope="col" className="px-6 py-3">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="text-center ">
						{currentItems.map((data, index) => (
							<tr
								key={data._id}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
							>
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									{indexOfFirstItem + index + 1}
								</th>
								<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{data.categoryName}
								</td>
								<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{data.status === "active" ? (
										<button className="badge badge-success">Active</button>
									) : (
										<button className="badge badge-error">Blocked</button>
									)}
								</td>
								<td className="px-4 py-2 space-x-4">
									<button
										className="btn btn-outline btn-info text-sm btn-sm "
										onClick={() => handleEditCategory(data)}
									>
										Edit
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* Pagination Controls */}
			<div className="flex justify-center mt-6">
				<div className="join">
					{Array.from({ length: totalPages }, (_, index) => (
						<input
							key={index}
							className="join-item btn btn-square btn-sm "
							type="radio"
							name="options"
							aria-label={`${index + 1}`}
							checked={currentPage === index + 1}
							onChange={() => handlePageChange(index + 1)}
						/>
					))}
				</div>
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
					<div className="bg-gray-950 p-6 rounded-lg shadow-lg w-full max-w-2xl">
						<h2 className="text-xl font-bold mb-8">Add New Category</h2>

						<Formik
							initialValues={initialValues}
							onSubmit={handleAddCategory}
							validationSchema={addCategorySchema}
						>
							{({ isSubmitting }) => (
								<Form>
									<div className="flex flex-col gap-8">
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
									<div className="flex space-x-3 justify-end">
										<button
											type="submit"
											className="btn btn-success btn-outline btn-md"
											disabled={isSubmitting}
										>
											Add
										</button>
										<button
											type="button"
											className="btn btn-error btn-outline btn-md"
											onClick={() => setIsModalOpen(false)}
											disabled={isSubmitting}
										>
											Cancel
										</button>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			)}
			{isEditModalOpen && editCategory && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
					<div className="bg-gray-950 p-6 rounded-lg shadow-lg w-full max-w-2xl">
						<h2 className="text-xl font-bold mb-8">Edit Category</h2>

						<Formik
							initialValues={{
								categoryName: editCategory.categoryName,
								status: editCategory.status,
							}}
							onSubmit={handleSubmitEditCategory}
							validationSchema={addCategorySchema}
						>
							{({ isSubmitting }) => (
								<Form>
									<div className="flex flex-col gap-8">
										<div className="w-full">
											<div className="flex flex-col">
												<label
													htmlFor="categoryName"
													className="block text-xs font-semibold mb-2"
												>
													CATEGORY NAME
												</label>
												<Field
													className={`w-full px-5 py-3 rounded-lg  font-medium border-2 ${
														theme === "light"
															? "bg-gray-200 text-gray-600"
															: "bg-gray-900 text-gray-300"
													} border-transparent  text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100`}
													type="text"
													placeholder="Category Name"
													name="categoryName"
												/>
												<ErrorMessage
													className="text-xs font-semibold text-red-500 ml-3"
													name="categoryName"
													component="span"
												/>
											</div>
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
									<div className="flex space-x-3 justify-end">
										<button
											type="submit"
											className="btn btn-success btn-outline btn-md"
											disabled={isSubmitting}
										>
											Edit
										</button>
										<button
											type="button"
											className="btn btn-error btn-outline btn-md"
											onClick={() => setIsEditModalOpen(false)}
											disabled={isSubmitting}
										>
											Cancel
										</button>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			)}
		</div>
	);
};
