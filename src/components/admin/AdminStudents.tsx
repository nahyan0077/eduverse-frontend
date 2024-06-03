import { useAppDispatch } from "@/hooks/hooks";
import { getAllStudentsAction } from "@/redux/store/actions/user";
import { useEffect, useState } from "react";
import LoadingPopUp from "../common/skeleton/LoadingPopUp";
import CloseIcon from "@mui/icons-material/Close";
import { blockUserAction } from "@/redux/store/actions/admin";
import ConfirmModal from "@/components/common/modal/ConfirmModal";
import { Toaster, toast } from "sonner";
import { format } from "date-fns";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";


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

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const resultAction = await dispatch(
					getAllStudentsAction({ page: 1, limit: 10 })
				);
				console.log(resultAction, "action result get stuu");

				if (getAllStudentsAction.fulfilled.match(resultAction)) {
					setStudents(resultAction.payload.data);
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
	}, [dispatch]);

	const handleDelete = async () => {
		if (selectedStudent) {
			const response = await dispatch(
				blockUserAction({
					id: selectedStudent.id,
					isBlocked: !selectedStudent.isBlocked,
				})
			);
			console.log(response, "block and unblock user..!");

			if (blockUserAction.fulfilled.match(response)) {
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

	if (loading) {
		return <LoadingPopUp isLoading={loading} />;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="overflow-x-auto max-w-full mx-auto p-8">
			<Toaster richColors position="top-right" />
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
					{students.map((student, index) => (
						<tr key={student._id} className="hover:bg-gray-800">
							<th>{index + 1}</th>
							<td>{student.userName}</td>
							<td>{format(new Date(student.createdAt), "dd-MM-yyyy")}</td>
							<td>{student.isVerified ? <DoneOutlineIcon color="success" /> : <CloseIcon />}</td>
							<td>
								{student.isBlocked ? (
									<button
										className="btn btn-sm btn-outline btn-primary"
										onClick={() => handleBlock(student._id, student.isBlocked)}
									>
										Unblock
									</button>
								) : (
									<button
										className="btn btn-sm btn-outline btn-error"
										onClick={() => handleBlock(student._id, student.isBlocked)}
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

export default AdminStudents;
