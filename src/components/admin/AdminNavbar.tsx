import React, { useState } from "react";
import { ModeToggle } from "../ui/mode-toggle";
import { IoMdPerson } from "react-icons/io";
import ConfirmModal from "@/components/common/modal/ConfirmModal";
import { logoutAction } from "@/redux/store/actions/auth/logoutAction";
import { useAppDispatch } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";

const AdminNavbar: React.FC = () => {
	// const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isModalVisible, setModalVisible] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();


	const handleDelete = async () => {
		dispatch(logoutAction()).then(() => {
			navigate("/");
		});

		console.log("Item deleted");
		setModalVisible(false);
	};

	const handleCancel = () => {
		console.log("Action cancelled");
		setModalVisible(false);
	};

	const handleLogout = async () => {
		setModalVisible(true);
	};

	return (
		<nav className="flex items-center justify-between flex-wrap bg-gray-900 p-4 lg:px-6 lg:py-3 z-10 ">
			{isModalVisible && (
				<ConfirmModal
					message="logout"
					onConfirm={handleDelete}
					onCancel={handleCancel}
				/>
			)}
			<div className="flex items-center">
				<span className="font-bold text-2xl pl-2 text-white">Admin Panel</span>
				{/* Add any additional navbar items here */}
			</div>
			<div className="flex items-center space-x-7 ">
				<div className="flex items-center ml-4">
					<div className="hidden md:block dropdown dropdown-end">
						<div
							tabIndex={0}
							role="button"
							className="btn m-1 hover:bg-gray-900 border border-transparent bg-transparent"
						>
							<IoMdPerson className="text-xl"  />
							ADMIN
						</div>
						<ul
							tabIndex={0}
							className="dropdown-content z-[1] menu p-2 shadow bg-white dark:bg-gray-950 rounded-box w-52"
						>
							<li>
								<a onClick={handleLogout}>Logout</a>
							</li>
						</ul>
					</div>
				</div>
				<ModeToggle />
			</div>
		</nav>
	);
};

export default AdminNavbar;
