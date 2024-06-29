import React from "react";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { useTheme } from "../ui/theme-provider";

const UserDetailPage: React.FC = () => {
	const location = useLocation();
	const user = location.state?.user[0];

	const { theme } = useTheme();

	return (
		<div
			className={`container mx-auto p-6 ${
				theme ? "bg-gray-900 text-gray-300" : "bg-white text-gray-900"
			}`}
		>
			<div className="flex items-center mb-8">
				<div className="w-24 h-24 rounded-full mr-4 overflow-hidden">
					<img
						className="object-cover w-full h-full rounded-full"
						src={user.profile.avatar}
						alt=""
					/>
				</div>
				<div>
					<h1
						className={`text-3xl font-bold ${
							theme ? "text-gray-100" : "text-gray-900"
						}`}
					>
						{user.firstName} {user.lastName}
					</h1>
					<p className="text-gray-600">
						{user.role} | {user.profession}
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div
					className={`shadow-md rounded-lg p-6 ${
						theme ? "bg-gray-800" : "bg-gray-100"
					}`}
				>
					<h2
						className={`text-xl font-bold mb-4 ${
							theme ? "text-violet-300" : "text-violet-600"
						}`}
					>
						Personal Information
					</h2>
					<div className="grid grid-cols-2 gap-4">
						<div className="col-span-2">
							<p className="font-bold">Gender:</p>
							<p>{user.profile.gender}</p>
						</div>
						<div>
							<p className="font-bold">Date of Birth:</p>
							<p>
								{format(new Date(user.profile.dateOfBirth), "dd MMMM, yyyy")}
							</p>
						</div>
						<div className="col-span-2">
							<p className="font-semibold">Permanent Address:</p>
							<p>{user.contact.address}</p>
						</div>
					</div>
				</div>

				<div
					className={`shadow-md rounded-lg p-6 ${
						theme ? "bg-gray-800" : "bg-gray-100"
					}`}
				>
					<h2
						className={`text-xl font-semibold mb-4 ${
							theme ? "text-violet-300" : "text-violet-600"
						}`}
					>
						Account Details
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<p className="font-semibold">ID:</p>
							<p>{user._id}</p>
						</div>
						<div>
							<p className="font-semibold">User Name:</p>
							<p>{user.userName}</p>
						</div>
						<div>
							<p className="font-semibold">Email:</p>
							<p>{user.email}</p>
						</div>
						<div>
							<p className="font-semibold">First Name:</p>
							<p>{user.firstName}</p>
						</div>
						<div>
							<p className="font-semibold">Last Name:</p>
							<p>{user.lastName}</p>
						</div>
					</div>
				</div>
			</div>

			<div
				className={`shadow-md rounded-lg p-6 mt-6 ${
					theme ? "bg-gray-800" : "bg-gray-100"
				}`}
			>
				<h2
					className={`text-xl font-semibold mb-4 ${
						theme ? "text-violet-300" : "text-violet-600"
					}`}
				>
					Additional Information
				</h2>
				<div>
					<p className="font-semibold">
						Created At:{" "}
						<span>{format(new Date(user.createdAt), "dd MMMM, yyyy")}</span>
					</p>
					<p className="font-semibold">
						Google Auth: <span>{user.isGAuth ? "Yes" : "No"}</span>
					</p>
					<p className="font-semibold">
						Blocked: <span>{user.isBlocked ? "Yes" : "No"}</span>
					</p>
					<p className="font-semibold">
						Verified: <span>{user.isVerified ? "Yes" : "No"}</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default UserDetailPage;
