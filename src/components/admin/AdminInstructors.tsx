import { useAppDispatch } from "@/hooks/hooks";
import { getAllInstructorsAction } from "@/redux/store/actions/user";
import { useEffect, useState } from "react";
import LoadingPopUp from "../common/skeleton/LoadingPopUp";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import { blockUserAction } from "@/redux/store/actions/admin";
import ConfirmModal from "@/components/common/modal/ConfirmModal";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Instructor {
	_id: string;
	userName: string;
	createdAt: string;
	isVerified: boolean;
	isBlocked: boolean;
}

export const AdminInstructors: React.FC = () => {
	const dispatch = useAppDispatch();
	const [instructors, setInstructors] = useState<Instructor[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isModalVisible, setModalVisible] = useState(false);
	const [selectedInstructor, setSelectedInstructor] = useState<{
		id: string;
		isBlocked: boolean;
	} | null>(null);
	const navigate = useNavigate();

	const [currentPage, setCurrentPage] = useState(1);
	const usersPerPage = 5;

	useEffect(() => {
		const fetchInstructors = async () => {
			try {
				const resultAction = await dispatch(
					getAllInstructorsAction({ page: currentPage, limit: usersPerPage })
				);
				console.log(resultAction, "action result get instr");

				if (getAllInstructorsAction.fulfilled.match(resultAction)) {
					const instructorsData = resultAction.payload.data;
					if (instructorsData.length > 0) {
						setInstructors(instructorsData);
					} else {
						setCurrentPage((prevPage) => prevPage - 1);
					}
				} else {
					setError("Failed to fetch instructors");
				}
			} catch (err) {
				setError("An error occurred");
			} finally {
				setLoading(false);
			}
		};

		fetchInstructors();
	}, [dispatch, currentPage]);

	const handleDelete = async () => {
		if (selectedInstructor) {
			const response = await dispatch(
				blockUserAction({
					id: selectedInstructor.id,
					isBlocked: !selectedInstructor.isBlocked,
				})
			);
			console.log(response, "block and unblock user..!");

			if (blockUserAction.fulfilled.match(response)) {
				setInstructors((prevInstructors) =>
					prevInstructors.map((instructor) =>
						instructor._id === selectedInstructor.id
							? { ...instructor, isBlocked: !selectedInstructor.isBlocked }
							: instructor
					)
				);
				toast.success(
					`Instructor ${
						selectedInstructor.isBlocked ? "unblocked" : "blocked"
					} successfully`
				);
			} else {
				toast.error("Error occurred");
			}
			setModalVisible(false);
			setSelectedInstructor(null);
		}
	};

	const handleCancel = () => {
		console.log("Action cancelled");
		setModalVisible(false);
	};

	const handleBlock = (instructorId: string, isBlocked: boolean) => {
		console.log(instructorId, isBlocked, "block and unblock");

		setSelectedInstructor({ id: instructorId, isBlocked });
		setModalVisible(true);
	};

	const handleDisplayUser = (id: string) => {
		let user = instructors.filter((data) => data._id === id);
		navigate("/admin/user-data", { state: { user } });
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	if (loading) {
		return <LoadingPopUp isLoading={loading} />;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="overflow-x-auto max-w-7xl mx-auto p-8">
			<Toaster richColors position="top-right" />
			{isModalVisible && (
				<ConfirmModal
					message={`${
						selectedInstructor?.isBlocked ? "Unblock" : "Block"
					} this instructor`}
					onConfirm={handleDelete}
					onCancel={handleCancel}
				/>
			)}
			<h1 className="text-3xl font-bold ml-10 mb-10">Instructors</h1>
			<table className="table table-lg">
				<thead className="text-lg uppercase text-center bg-black">
					<tr>
						<th>Si.No</th>
						<th>Name</th>
						<th>Joined</th>
						<th>Verified</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{instructors.map((instructor, index) => (
						<tr
							key={instructor._id}
							className="hover:bg-gray-800"
							onClick={() => handleDisplayUser(instructor._id)}
						>
							<th>{(currentPage - 1) * usersPerPage + index + 1}</th>
							<td>{instructor.userName}</td>
							<td>{format(new Date(instructor.createdAt), "dd-MM-yyyy")}</td>
							<td>
								{instructor.isVerified ? (
									<DoneIcon className="text-green-600" />
								) : (
									<CloseIcon />
								)}
							</td>
							<td>
								{instructor.isBlocked ? (
									<button
										className="btn btn-sm btn-outline btn-primary"
										onClick={(e) => {
											e.stopPropagation();
											handleBlock(instructor._id, instructor.isBlocked);
										}}
									>
										Unblock
									</button>
								) : (
									<button
										className="btn btn-sm btn-outline btn-error"
										onClick={(e) => {
											e.stopPropagation();
											handleBlock(instructor._id, instructor.isBlocked);
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

			{/* Pagination Controls */}
			<div className="flex justify-center mt-6">
				<div className="join">
					{Array.from({ length: Math.max(currentPage, instructors.length === usersPerPage ? currentPage + 1 : currentPage) }, (_, index) => (
						<input
							key={index}
							className="join-item btn btn-square btn-sm"
							type="radio"
							name="options"
							aria-label={`${index + 1}`}
							checked={currentPage === index + 1}
							onChange={() => handlePageChange(index + 1)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default AdminInstructors;
