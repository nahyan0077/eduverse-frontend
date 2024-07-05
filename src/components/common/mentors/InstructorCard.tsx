import { SignupFormData } from "@/types/IForms";
import React from "react";

export const InstructorCard: React.FC<{ instructor: SignupFormData }> = ({
	instructor,
}) => {
	return (
		<div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden transform transition duration-500 hover:scale-105">
			<div className="h-48 w-full overflow-hidden">
				<img
					src={
						instructor?.profile?.avatar ||
						"https://www.pngkey.com/png/detail/72-729716_user-avatar-png-graphic-free-download-icon.png"
					}
					alt={`${instructor.firstName} ${instructor.lastName}`}
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="p-6">
				<h2 className="text-md font-semibold dark:text-white text-gray-800 mb-2">{`${instructor.firstName?.toUpperCase()} ${instructor.lastName?.toUpperCase()}`}</h2>
				<p className="text-gray-600 text-sm mb-4">{instructor.role}</p>
				<p className="text-gray-500 text-xs mb-4">{instructor.email}</p>
				<div className="flex items-center justify-between">
					<span
						className={`text-xs font-medium px-2 py-1 rounded-full ${
							instructor.isVerified
								? "bg-green-100 text-green-800"
								: "bg-red-100 text-red-800"
						}`}
					>
						{instructor.isVerified ? "Verified" : "Unverified"}
					</span>
					<a
						href={`https://${instructor?.contact?.social}`}
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-blue-600 hover:text-blue-800 transition duration-300"
					>
						LinkedIn
					</a>
				</div>
			</div>
		</div>
	);
};
