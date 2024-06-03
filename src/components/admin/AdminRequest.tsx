import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useAppDispatch } from "@/hooks/hooks";
import LoadingPopUp from "../common/skeleton/LoadingPopUp";
import { getAllInstructorsAction } from "@/redux/store/actions/user";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ConfirmModal from "@/components/common/modal/ConfirmModal";
import DownloadIcon from "@mui/icons-material/Download";
import { verifyInstructorAction } from "@/redux/store/actions/admin";
import { rejectInstructorAction } from "@/redux/store/actions/admin/rejectInstructorAction";
import CloseIcon from '@mui/icons-material/Close';
import { Toaster, toast } from "sonner";

interface InstructorRequest {
	_id: string;
	userName: string;
	createdAt: string;
	isVerified: boolean;
	cv: string;
	email: string;
	isRejected: boolean
}

export const AdminRequests: React.FC = () => {
	const dispatch = useAppDispatch();
	const [requests, setRequests] = useState<InstructorRequest[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isModalVisible, setModalVisible] = useState(false);
	const [isModalVisible1, setModalVisible1] = useState(false);
	const [selectedRequest, setSelectedRequest] = useState<{
		id: string;
		email: string;
	} | null>(null);
	const [rejectedRequest, setRejectedRequest] = useState<{
		id: string;
		email: string;
	} | null>(null);

	useEffect(() => {
		const fetchInstructors = async () => {
			try {
				const resultAction = await dispatch(
					getAllInstructorsAction({ page: 1, limit: 10 })
				);
				console.log(resultAction, "aciton result get instr");

				if (getAllInstructorsAction.fulfilled.match(resultAction)) {
					setRequests(resultAction.payload.data);
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

	if (loading) {
		return <LoadingPopUp isLoading={loading} />;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	//approve instructor----------->

	const handleDelete = async () => {
		if (selectedRequest) {
			const response = await dispatch(
				verifyInstructorAction({
					id: selectedRequest.id,
					email: selectedRequest.email,
				})
			);requests
			console.log(response, "verify instructor response");

			if (verifyInstructorAction.fulfilled.match(response)) {
				setRequests((prevRequest) =>
					prevRequest.map((request) =>
						request._id === selectedRequest.id
							? { ...request, isVerified: true }
							: request
					)
				);
			}

			console.log("Item deleted");
			setModalVisible(false);
			toast.success("instructor rejected successfully..!")
		}
	};

	const handleCancel = () => {
		console.log("Action cancelled");
		setModalVisible(false);
	};

	const handleVerify = async (id: string, email: string) => {
		setSelectedRequest({ id, email });
		setModalVisible(true);
	};


	//reject instructor------------------>

	const handleDelete1 = async () => {
		if (rejectedRequest) {
			const response = await dispatch(
				rejectInstructorAction({
					id: rejectedRequest.id,
					email: rejectedRequest.email,
				})
			);
			console.log(response, "verify instructor response");

			if (rejectInstructorAction.fulfilled.match(response)) {
				setRequests((prevRequest) =>
					prevRequest.map((request) =>
						request._id === rejectedRequest.id
							? { ...request, isRejected: true }
							: request
					)
				);
			}

			console.log("Item deleted");
			setModalVisible1(false);
			toast.success("instructor approved successfully...!")
		}
	};

	const handleCancel1 = () => {
		console.log("Action cancelled");
		setModalVisible1(false);
	};





	const handleReject = async (id: string, email: string) => {
		setRejectedRequest({ id, email });
		setModalVisible1(true);
	};





	const downloadCV = (cvUrl: string) => {
		// Implement download logic here, such as opening the CV in a new tab
	
		window.open(cvUrl, "_blank");
	
	};

	return (
		<div className="overflow-x-auto max-w-full mx-auto p-8">
			<Toaster richColors position="top-center" />
			{isModalVisible && (
				<ConfirmModal
					message= "verify the instructor"
					onConfirm={handleDelete}
					onCancel={handleCancel}
				/>
			)}
			{isModalVisible1 && (
				<ConfirmModal
					message= "reject the instructor"
					onConfirm={handleDelete1}
					onCancel={handleCancel1}
				/>
			)}
			<h1 className="text-3xl font-bold ml-10 mb-10">Requests</h1>
			<table className="table table-lg">
				<thead className="text-lg uppercase text-center bg-gray-950 ">
					<tr>
						<th>Si.No</th>
						<th>Name</th>
						<th>Applied Date</th>
						<th>CV</th>
						<th>Verify/Reject</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{requests.map((request, index) => (
						<tr key={request._id} className="hover:bg-gray-800">
							<th>{index + 1}</th>
							<td>{request.userName}</td>
							<td>{format(new Date(request.createdAt), "dd-MM-yyyy")}</td>
							<td>
								<button
									className="btn btn-outline btn-info btn-sm"
									onClick={() => downloadCV(request.cv)}
								>
									CV <DownloadIcon fontSize="small" />
								</button>
							</td>
							<td>
							{request.isRejected ? <CloseIcon color="error" /> : 
								request.isVerified ? (
									<DoneOutlineIcon color="success" />
								) : (
									<div className="flex justify-center gap-3" >

									<button
										onClick={() => handleVerify(request._id, request.email)}
										className="btn btn-outline btn-success btn-sm "
									>
										{" "}
										Verify{" "}
									</button>
									<button
										onClick={() => handleReject(request._id, request.email)}
										className="btn btn-outline btn-error btn-sm "
									>
										{" "}
										Reject{" "}
									</button>
									</div>
								)
							}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
