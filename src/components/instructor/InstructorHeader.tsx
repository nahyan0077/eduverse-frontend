import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { TbBulb } from "react-icons/tb";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "../ui/mode-toggle";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import PersonIcon from "@mui/icons-material/Person";
import { SignupFormData } from "@/types/IForms";
import { useAppDispatch } from "@/hooks/hooks";
import { logoutAction } from "@/redux/store/actions/auth/logoutAction";
import ConfirmModal from "@/components/common/modal/ConfirmModal";
import { useTheme } from "../ui/theme-provider";
import { Toaster, toast } from "sonner";

const InstructorHeader: React.FC = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate();
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const [isModalVisible, setModalVisible] = useState(false);
	const userData = useSelector((state: RootState) => state.user);

	const isAuthenticated = userData.data !== null && userData.data !== undefined;

	const userName = isAuthenticated
		? (userData.data as SignupFormData).userName
		: "";

	console.log("header data", userData.data);

	const menuItems = [
		{
			label: "Dashboard",
			onClick: () => {

                if (userData.data?.role == 'instructor' && userData.data.isVerified) {
                    
                    navigate("/home");
                }else{
                    toast.error("Please wait you accout verifcation is in progress",{
                        description: "Once verified you will recive the email"
                    })
                }

			},
		},
		{ label: "Instructors", onClick: () => navigate("") },
		{ label: "Courses", onClick: () => navigate("") },
		{ label: "Contact", onClick: () => navigate("/contact") },
		{ label: "About", onClick: () => navigate("/about") },
	];

	const authItems = isAuthenticated
		? [
				// { label: "User", onClick: () => navigate("/selection") },
		  ]
		: [
				{ label: "Login", onClick: () => navigate("/login") },
				{ label: "Get Started", onClick: () => navigate("/selection") },
		  ];

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
		<>
            <Toaster position="top-center" richColors />
			{isModalVisible && (
				<ConfirmModal
					message="logout"
					onConfirm={handleDelete}
					onCancel={handleCancel}
				/>
			)}
			<nav
				className={`p-5  shadow-md sticky top-0 z-10 ${
					theme === "light" ? "bg-white" : "bg-gray-950"
				}`}
			>
				<div className="flex items-center justify-between max-w-7xl mx-auto">
					<div
						className={`flex items-center ${
							theme === "light" ? "text-violet-700" : "text-white"
						} cursor-pointer`}
						onClick={() => navigate("/")}
					>
						<span className="font-extrabold text-3xl">EDU</span>
						<TbBulb className="font-extrabold text-3xl mt-1" />
						<span className="font-extrabold text-3xl">VERSE</span>
					</div>

					<div className="hidden md:flex items-center space-x-10">
						{menuItems.map((item) => (
							<a
								key={item.label}
								onClick={item.onClick}
								className={`${
									theme === "light"
										? "text-violet-700 hover:text-gray-950"
										: "text-white"
								}  dark:hover:text-violet-700 font-Josefin rounded-xl p-3 cursor-pointer`}
							>
								{item.label}
							</a>
						))}
					</div>
					<div className="hidden md:flex items-center space-x-4">
						{isAuthenticated && (
							<div className="hidden md:block dropdown">
								<div
									tabIndex={0}
									role="button"
									className={`btn m-1 ${
										theme == "light"
											? "text-violet-700 hover:bg-gray-200"
											: "hover:bg-gray-900"
									}    bg-transparent`}
								>
									<PersonIcon />
									{userName?.toUpperCase()}
								</div>
								<ul
									tabIndex={0}
									className={`dropdown-content z-[1] menu p-2 shadow ${
										theme == "light" ? "bg-gray-100" : "bg-gray-950"
									}   rounded-box w-52`}
								>
									<li>
										<a>Profile</a>
									</li>
									<li>
										<a onClick={handleLogout}>Logout</a>
									</li>
								</ul>
							</div>
						)}

						{authItems.map(({ label, onClick }) => (
							<button
								key={label}
								className={`border border-violet-700 ${
									label === "Login"
										? `${theme === "light" ? "text-violet-700" : "text-white"}`
										: "text-white bg-violet-700" || label == "User"
										? `${theme === "light" ? "text-violet-700" : "text-white"}`
										: "text-white bg-violet-700"
								} text-sm px-4 py-2 rounded-md hover:bg-violet-100 dark:hover:bg-gray-800 `}
								onClick={onClick}
							>
								{label}
							</button>
						))}
					</div>
					<ModeToggle />

					<div
						className={`md:hidden ${
							theme === "light" ? "text-violet-700" : "text-white"
						} hover:text-gray-300 cursor-pointer`}
					>
						<MenuRoundedIcon onClick={() => setMenuOpen(!menuOpen)} />
					</div>
				</div>

				<AnimatePresence>
					{menuOpen && (
						<>
							<motion.div
								className="fixed top-0 left-0 w-full h-full backdrop-blur-sm backdrop-brightness-50 z-20"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3 }}
								onClick={() => setMenuOpen(false)}
							/>

							<motion.div
								className={`fixed top-0 w-[70%] h-full right-0 ${
									theme === "light" ? "bg-white" : "bg-gray-900"
								} shadow-md z-30`}
								initial={{ x: "100%" }}
								animate={{ x: 0 }}
								exit={{ x: "100%" }}
								transition={{ type: "spring", stiffness: 400, damping: 30 }}
							>
								<div className="p-3 flex justify-end">
									<ClearIcon
										className="cursor-pointer"
										onClick={() => setMenuOpen(false)}
									/>
								</div>
								<ul className="flex flex-col space-y-4 p-5 overflow-y-auto h-[calc(100vh-56px)]">
									{menuItems.map((item) => (
										<li
											key={item.label}
											className={`py-2 px-4 border-b ${
												theme === "light"
													? "hover:bg-violet-100"
													: "hover:bg-gray-800"
											} rounded-md font-semibold cursor-pointer`}
											onClick={() => {
												setMenuOpen(false);
												item.onClick();
											}}
										>
											{item.label}
										</li>
									))}
									{authItems?.map(({ label, onClick }) => (
										<li
											key={label}
											className={`py-2 px-4 border-b ${
												theme === "light"
													? "hover:bg-violet-100"
													: "hover:bg-gray-800"
											} rounded-md font-semibold cursor-pointer`}
											onClick={() => {
												setMenuOpen(false);
												onClick();
											}}
										>
											{label}
										</li>
									))}
								</ul>
							</motion.div>
						</>
					)}
				</AnimatePresence>
			</nav>
		</>
	);
};

export default InstructorHeader;
