import { useAppDispatch } from "@/hooks/hooks";
import { getAllStudentsAction } from "@/redux/store/actions/user";
import { useEffect, useState } from "react";
import LoadingPopUp from "../common/skeleton/LoadingPopUp";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmModal from "@/components/common/modal/ConfirmModal";
import { Toaster, toast } from "sonner";
import { format } from "date-fns";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { useNavigate } from "react-router-dom";
import { updateProfileAction } from "@/redux/store/actions/user/updateProfileAction";
import { SearchBar } from "../common/admin/SearchBar";
import Pagination from "../common/admin/Pagination";

interface Student {
	_id: string;
	userName: string;
	createdAt: string;
	isVerified: boolean;
	isBlocked: boolean;
}

export const AdminStudents: React.FC = () => {
	const dispatch = useAppDispatch();
	const [students, setStudents] = useState<Student[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isModalVisible, setModalVisible] = useState(false);
	const [selectedStudent, setSelectedStudent] = useState<{
		id: string;
		isBlocked: boolean;
	} | null>(null);
	const navigate = useNavigate();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const studentsPerPage = 5;
	const [totalPages, setTotalPages] = useState<number>(1);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const resultAction = await dispatch(
					getAllStudentsAction({
						page: currentPage,
						limit: studentsPerPage,
						search: searchQuery,
					})
				);

				if (getAllStudentsAction.fulfilled.match(resultAction)) {
					setStudents(resultAction.payload.data.data);

					setTotalPages(resultAction.payload.data.totalPages);
				} else {
					setError("Failed to fetch students");
				}
			} catch (err) {
				setError("An error occurred");
			} finally {
				setLoading(false);
			}
		};

		fetchStudents();
	}, [dispatch, currentPage, searchQuery]);

	const handleDelete = async () => {
		if (selectedStudent) {
			const response = await dispatch(
				updateProfileAction({
					_id: selectedStudent.id,
					isBlocked: !selectedStudent.isBlocked,
				})
			);
			console.log(response, "block and unblock user..!");

			if (updateProfileAction.fulfilled.match(response)) {
				setStudents((prevStudents) =>
					prevStudents.map((student) =>
						student._id === selectedStudent.id
							? { ...student, isBlocked: !selectedStudent.isBlocked }
							: student
					)
				);
				toast.success("User blocked/unblocked successfully");
			} else {
				toast.error("Error occurred");
			}
			setModalVisible(false);
			setSelectedStudent(null);
		}
	};

	const handleCancel = () => {
		console.log("Action cancelled");
		setModalVisible(false);
	};

	const handleBlock = (studentId: string, isBlocked: boolean) => {
		setSelectedStudent({ id: studentId, isBlocked });
		setModalVisible(true);
	};

	const handleDisplayUser = (id: string) => {
		const user = students.filter((data) => {
			return data._id == id;
		});

		navigate("/admin/user-data", { state: { user } });
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	if (loading) {
		return <LoadingPopUp isLoading={loading} />;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="max-w-full mx-auto py-20 px-20">
			<Toaster richColors position="top-center" />
			{isModalVisible && (
				<ConfirmModal
					message={` ${
						selectedStudent?.isBlocked ? "Unblock" : "Block"
					}  this student  `}
					onConfirm={handleDelete}
					onCancel={handleCancel}
				/>
			)}
			<h1 className="text-3xl font-bold ml-10 mb-10">Students</h1>
			{/* <------------------- search -----------------> */}

			<div className="flex justify-end items-center">
				<div>
					<SearchBar onSearchChange={handleSearchChange} />
				</div>
			</div>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-900 dark:text-gray-400">
						<tr className="text-center">
							<th scope="col" className="px-6 py-3">
								Si.No
							</th>
							<th scope="col" className="px-6 py-3">
								Name
							</th>
							<th scope="col" className="px-6 py-3">
								Joined
							</th>
							<th scope="col" className="px-6 py-3">
								Verified
							</th>
							<th scope="col" className="px-6 py-3">
								Status
							</th>
						</tr>
					</thead>
					<tbody className="text-center">
						{students.map((student, index) => (
							<tr
								key={student._id}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
								onClick={() => handleDisplayUser(student._id)}
							>
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									{(currentPage - 1) * studentsPerPage + index + 1}
								</th>
								<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{student.userName}
								</td>
								<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{format(new Date(student.createdAt), "dd-MM-yyyy")}
								</td>
								<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{student.isVerified ? (
										<DoneOutlineIcon color="success" />
									) : (
										<CloseIcon />
									)}
								</td>
								<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{student.isBlocked ? (
										<button
											className="btn btn-sm btn-outline btn-primary"
											onClick={(e) => {
												e.stopPropagation();
												handleBlock(student._id, student.isBlocked);
											}}
										>
											Unblock
										</button>
									) : (
										<button
											className="btn btn-sm btn-outline btn-error"
											onClick={(e) => {
												e.stopPropagation();
												handleBlock(student._id, student.isBlocked);
											}}
										>
											Block
										</button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination Controls */}
			<div className="flex justify-center mt-6">
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	);
};

export default AdminStudents;
