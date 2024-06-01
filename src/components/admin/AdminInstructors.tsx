import { useAppDispatch } from "@/hooks/hooks";
import { getAllInstructorsAction } from "@/redux/store/actions/user";
import { useEffect, useState } from "react";
import LoadingPopUp from "../common/skeleton/LoadingPopUp";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import { blockUserAction } from "@/redux/store/actions/admin";
import ConfirmModal from "@/components/common/modal/ConfirmModal";
import { ToastContainer, toast } from "react-toastify";

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

	useEffect(() => {
		const fetchInstructors = async () => {
			try {
				const resultAction = await dispatch(
					getAllInstructorsAction({ page: 1, limit: 10 })
				);
				console.log(resultAction, "aciton result get instr");

				if (getAllInstructorsAction.fulfilled.match(resultAction)) {
					setInstructors(resultAction.payload.data);
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
	}, [dispatch]);

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
				toast.success("User blocked/unblocked successfully", {
					position: "top-right",
					autoClose: 4000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
			} else {
				toast.error("Error occurred", {
					position: "top-right",
					autoClose: 4000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
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
		console.log(instructorId, isBlocked, "blk and ukb");

		setSelectedInstructor({ id: instructorId, isBlocked });
		setModalVisible(true);
	};

	if (loading) {
		return <LoadingPopUp isLoading={loading} />;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="overflow-x-auto max-w-full mx-auto p-8">
			<ToastContainer />
			{isModalVisible && (
				<ConfirmModal
					message={` ${
						selectedInstructor?.isBlocked ? "Unblock" : "Block"
					}  this instructor  `}
					onConfirm={handleDelete}
					onCancel={handleCancel}
				/>
			)}
			<h1 className="text-3xl font-bold ml-10 mb-10">Instructors</h1>
			<table className="table table-lg">
				<thead className="text-lg uppercase text-center">
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
						<tr key={instructor._id} className="hover:bg-gray-800">
							<th>{index + 1}</th>
							<td>{instructor.userName}</td>
							<td>{format(new Date(instructor.createdAt), "dd-MM-yyyy")}</td>
							<td>{instructor.isVerified ? <DoneIcon /> : <CloseIcon />}</td>
							<td>
								{instructor.isBlocked ? (
									<button
										className="btn btn-sm btn-outline btn-primary"
										onClick={() =>
											handleBlock(instructor._id, instructor.isBlocked)
										}
									>
										Unblock
									</button>
								) : (
									<button
										className="btn btn-sm btn-outline btn-error"
										onClick={() =>
											handleBlock(instructor._id, instructor.isBlocked)
										}
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
	);
};

export default AdminInstructors;
