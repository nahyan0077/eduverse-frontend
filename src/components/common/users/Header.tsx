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
import { SignupFormData } from "@/types/IForms";
import { useAppDispatch } from "@/hooks/hooks";
import { logoutAction } from "@/redux/store/actions/auth/logoutAction";
import ConfirmModal from "../modal/ConfirmModal";
import { getAllActiveCategories } from "@/redux/store/actions/category";
import GlobalSearchBar from "./globalSearchBar";

const Header: React.FC = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate();
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const [isModalVisible, setModalVisible] = useState(false);
	const userData = useSelector((state: RootState) => state.user);

	useEffect(() => {
		dispatch(getAllActiveCategories());
	}, [dispatch]);

	const catgoryData = useSelector((state: RootState) => state.category);

	console.log(catgoryData, "category data");

	const isAuthenticated = userData.data !== null && userData.data !== undefined;

	const userName = isAuthenticated
		? (userData.data as SignupFormData).userName
		: "";

	console.log("header data", userData.data);

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

	const handleSearch = (query: string) => {
		navigate(`/search/?query=${query}`)
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
					theme === "light" ? "bg-transparent backdrop-blur-2xl black" : "bg-transparent backdrop-blur-2xl black"
				}`}
			>
				<div className="flex items-center justify-between max-w-7xl mx-auto">
					<div
						className={`flex items-center ${
							theme === "light"
								? "bg-gradient-to-r from-pink-700 to-blue-500 bg-clip-text text-transparent"
								: "bg-gradient-to-r from-pink-600 to-blue-500 bg-clip-text text-transparent"
						} cursor-pointer`}
						onClick={() => navigate("/home")}
					>
						<span className="font-extrabold text-3xl">EDU</span>
						<TbBulb className="font-extrabold text-3xl mt-1 text-violet-700 dark:text-violet-300" />
						<span className="font-extrabold text-3xl">VERSE</span>
					</div>

					<div className="hidden md:flex items-center space-x-3">
						<div
							className="dropdown dropdown-hover relative"
							onClick={() => navigate("/home")}
						>
							<div
								tabIndex={0}
								role="button"
								className={`btn m-1 ${
									theme === "light"
										? "text-violet-700 hover:bg-gray-200 border-transparent"
										: "text-white hover:bg-gray-900 border-transparent"
								} bg-transparent`}
							>
								Home
							</div>
						</div>
						<div className="dropdown dropdown-hover relative">
							<div
								tabIndex={0}
								role="button"
								className={`btn m-1 ${
									theme === "light"
										? "text-violet-700 hover:bg-gray-200 border-transparent"
										: "text-white hover:bg-gray-900 border-transparent"
								} bg-transparent`}
							>
								Categories
							</div>
							<ul
								className={`dropdown-content z-[1] menu p-2 shadow ${
									theme === "light" ? "bg-white" : "bg-gray-950"
								} rounded-box w-52`}
							>
								{catgoryData?.data.map((category) => (
									<li key={category._id}>
										<a
											onClick={() => {
												console.log(
													`Navigating to category ${category.categoryName}`
												);
												navigate(`/categories/${category._id}`);
											}}
										>
											{category.categoryName}
										</a>
									</li>
								))}
							</ul>
						</div>
						<div onClick={() => navigate("/courses")}>
							<div
								className={`btn m-1 ${
									theme === "light"
										? "text-violet-700 hover:bg-gray-200 border-transparent"
										: "text-white hover:bg-gray-900 border-transparent"
								} bg-transparent`}
							>
								Courses
							</div>
						</div>
						<div onClick={() => navigate("/contact")}>
							<div
								className={`btn m-1 ${
									theme === "light"
										? "text-violet-700 hover:bg-gray-200 border-transparent"
										: "text-white hover:bg-gray-900 border-transparent"
								} bg-transparent`}
							>
								Contact
							</div>
						</div>
						<div onClick={() => navigate("/about")}>
							<div
								className={`btn m-1 ${
									theme === "light"
										? "text-violet-700 hover:bg-gray-200 border-transparent"
										: "text-white hover:bg-gray-900 border-transparent"
								} bg-transparent`}
							>
								About
							</div>
						</div>
						<GlobalSearchBar handleSearch={handleSearch} />
					</div>

					<div className="hidden md:flex items-center space-x-3 relative">
						{isAuthenticated && (
							<div className="hidden md:block dropdown">
								<div
									tabIndex={0}
									role="button"
									className={`btn m-1 ${
										theme === "light"
										? "text-violet-700 hover:bg-gray-200 border-transparent"
										: "text-white hover:bg-gray-900 border-transparent"
									} bg-transparent`}
								>
									<img
										src={userData.data?.profile?.avatar}
										className="object-cover w-12 h-12 p-1 rounded-full"
										alt=""
									/>
									{userName}
								</div>
								<ul
									tabIndex={0}
									className={`dropdown-content z-[1] menu p-2 shadow ${
										theme === "light" ? "bg-gray-100" : "bg-gray-950"
									} rounded-box w-52`}
								>
									<li onClick={()=>navigate(`/student`)} >
										<a>Dashboard</a>
									</li>
									<li onClick={()=>navigate('/student/profile')} >
										<a>Profile</a>
									</li>
									<li>
										<a onClick={handleLogout}>Logout</a>
									</li>
								</ul>
							</div>
						)}

						{!isAuthenticated && (
							<>
								<button
									className={`border border-violet-700 ${
										theme === "light" ? "text-violet-700" : "text-white"
									} text-sm px-4 py-2 rounded-md hover:bg-violet-100 dark:hover:bg-gray-800`}
									onClick={() => navigate("/login")}
								>
									Login
								</button>
								<button
									className="border border-violet-700 text-white bg-violet-700 text-sm px-4 py-2 rounded-md hover:bg-violet-100 dark:hover:bg-gray-800"
									onClick={() => navigate("/selection")}
								>
									Get Started
								</button>
							</>
						)}
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
								className="fixed top-0 left-0 w-full h-full backdrop-blur-sm backdrop-brightness-50 z-20 "
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3 }}
								onClick={() => setMenuOpen(false)}
							/>

							<motion.div
								className={`fixed top-0 w-[70%] h-full right-0 ${
									theme === "light" ? "bg-white" : "bg-gray-900"
								} shadow-md z-30 `}
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
								<ul className="flex flex-col space-y-2 p-5 bg-white dark:bg-gray-900 min-h-screen">
									<GlobalSearchBar
										handleSearch={handleSearch}
									/>
									<li>
										<a
											className={`block p-3 ${
												theme === "light" ? "text-violet-700" : "text-white"
											} cursor-pointer`}
											onClick={() => navigate("/home")}
										>
											Home
										</a>
									</li>
									<li className="relative">
										<a
											className={`block p-3 ${
												theme === "light" ? "text-violet-700" : "text-white"
											} cursor-pointer`}
											onClick={() => {}}
										>
											Categories
										</a>
										<ul className="pl-4 mt-2 space-y-1">
											{catgoryData?.data.map((category) => (
												<li key={category._id}>
													<a
														className={`block p-2 ${
															theme === "light"
																? "text-violet-700"
																: "text-white"
														} cursor-pointer`}
														onClick={() => {
															console.log(
																`Dropdown item clicked: ${category.categoryName}`
															);
															navigate(`/categories/${category._id}`);
														}}
													>
														{category.categoryName}
													</a>
												</li>
											))}
										</ul>
									</li>
									<li>
										<a
											className={`block p-3 ${
												theme === "light" ? "text-violet-700" : "text-white"
											} cursor-pointer`}
											onClick={() => navigate("/courses")}
										>
											Courses
										</a>
									</li>
									<li>
										<a
											className={`block p-3 ${
												theme === "light" ? "text-violet-700" : "text-white"
											} cursor-pointer`}
											onClick={() => navigate("/contact")}
										>
											Contact
										</a>
									</li>
									<li>
										<a
											className={`block p-3 ${
												theme === "light" ? "text-violet-700" : "text-white"
											} cursor-pointer`}
											onClick={() => navigate("/about")}
										>
											About
										</a>
									</li>
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
