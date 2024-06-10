import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { TbBulb } from "react-icons/tb";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "../../ui/mode-toggle";
import { useTheme } from "../../ui/theme-provider";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import PersonIcon from "@mui/icons-material/Person";
import { SignupFormData } from "@/types/IForms";
import { useAppDispatch } from "@/hooks/hooks";
import { logoutAction } from "@/redux/store/actions/auth/logoutAction";
import ConfirmModal from "../modal/ConfirmModal";
import { getAllCategories } from "@/redux/store/actions/category";

const Header: React.FC = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate();
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const [isModalVisible, setModalVisible] = useState(false);
	const userData = useSelector((state: RootState) => state.user);

	useEffect(() => {
		dispatch(getAllCategories());
	}, [dispatch]);

	const catgoryData = useSelector((state: RootState) => state.category);

	console.log(catgoryData, "category data");

	const isAuthenticated = userData.data !== null && userData.data !== undefined;

	const userName = isAuthenticated
		? (userData.data as SignupFormData).userName
		: "";

	console.log("header data", userData.data);

	const menuItems = [
		{
			label: "Home",
			onClick: () => {
				console.log('Navigating to Home');
				navigate("/");
			}
		},
		{
			label: "Categories",
			onClick: () => {},
			dropdownItems: catgoryData?.data.map((category) => ({
				label: category.categoryName,
				onClick: () => {
					console.log(`Navigating to category ${category.categoryName}`);
					navigate(`/categories/${category._id}`);
				},
			})),
		},
		{ label: "Courses", onClick: () => navigate("/courses") },
		{ label: "Contact", onClick: () => navigate("/contact") },
		{ label: "About", onClick: () => navigate("/about") },
	];

	const authItems = isAuthenticated
		? []
		: [
				{ label: "Login", onClick: () => navigate("/login") },
				{ label: "Get Started", onClick: () => navigate("/selection") },
		  ];

	const handleDelete = async () => {
		dispatch(logoutAction()).then(() => {
			navigate("/");
		});
		setModalVisible(false);
	};

	const handleCancel = () => {
		setModalVisible(false);
	};

	const handleLogout = async () => {
		setModalVisible(true);
	};

	return (
		<>
			{isModalVisible && (
				<ConfirmModal
					message="logout"
					onConfirm={handleDelete}
					onCancel={handleCancel}
				/>
			)}
			<nav
				className={`p-5 shadow-md sticky top-0 z-10 ${
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
						{menuItems.map((menuItem) => (
							<div
								key={menuItem.label}
								className="dropdown dropdown-hover relative"
							>
								<div
									tabIndex={0}
									role="button"
									className={`btn m-1 ${
										theme === "light"
											? "text-violet-700 hover:bg-gray-200 border-white"
											: "hover:bg-gray-900 border-gray-950"
									} bg-transparent`}
									onClick={() => {
										console.log(`Menu item clicked: ${menuItem.label}`);
										menuItem.onClick();
									}}
								>
									{menuItem.label}
								</div>
								{menuItem.dropdownItems && (
									<ul
										className={`dropdown-content z-[1] menu p-2 shadow ${
											theme === "light" ? "bg-white" : "bg-gray-950"
										} rounded-box w-52`}
									>
										{menuItem.dropdownItems.map((dropdownItem) => (
											<li key={dropdownItem.label}>
												<a
													onClick={() => {
														console.log(`Dropdown item clicked: ${dropdownItem.label}`);
														dropdownItem.onClick();
													}}
												>
													{dropdownItem.label}
												</a>
											</li>
										))}
									</ul>
								)}
							</div>
						))}
					</div>
					<div className="hidden md:flex items-center space-x-4">
						{isAuthenticated && (
							<div className="hidden md:block dropdown">
								<div
									tabIndex={0}
									role="button"
									className={`btn m-1 ${
										theme === "light"
											? "text-violet-700 hover:bg-gray-200"
											: "hover:bg-gray-900"
									} bg-transparent`}
								>
									<PersonIcon />
									{userName?.toUpperCase()}
								</div>
								<ul
									tabIndex={0}
									className={`dropdown-content z-[1] menu p-2 shadow ${
										theme === "light" ? "bg-gray-100" : "bg-gray-950"
									} rounded-box w-52`}
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
										: "text-white bg-violet-700"
								} text-sm px-4 py-2 rounded-md hover:bg-violet-100 dark:hover:bg-gray-800`}
								onClick={() => {
									console.log(`Auth item clicked: ${label}`);
									onClick();
								}}
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
								<ul className="flex flex-col space-y-2 p-5">
									{menuItems.map((menuItem) => (
										<li key={menuItem.label}>
											<a
												className={`block p-3 ${
													theme === "light" ? "text-violet-700" : "text-white"
												} cursor-pointer`}
												onClick={() => {
													console.log(`Menu item clicked: ${menuItem.label}`);
													menuItem.onClick();
												}}
											>
												{menuItem.label}
											</a>
											{menuItem.dropdownItems && (
												<ul className="pl-4 mt-2 space-y-1">
													{menuItem.dropdownItems.map((dropdownItem) => (
														<li key={dropdownItem.label}>
															<a
																className={`block p-2 ${
																	theme === "light"
																		? "text-violet-700"
																		: "text-white"
																} cursor-pointer`}
																onClick={() => {
																	console.log(
																		`Dropdown item clicked: ${dropdownItem.label}`
																	);
																	dropdownItem.onClick();
																}}
															>
																{dropdownItem.label}
															</a>
														</li>
													))}
												</ul>
											)}
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

export default Header;
