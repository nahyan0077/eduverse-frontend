import React from "react";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";
import { FaFilePdf } from "react-icons/fa";

interface MessageProps {
	message: {
		senderId: string;
		content: string;
		createdAt: string;
		recieverSeen: boolean;
		contentType: string;
	};
	currentUser: string;
}

function formatChatTime(isoString: string) {
	const date = new Date(isoString);

	let hours: any = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const ampm = hours >= 12 ? "PM" : "AM";

	hours = hours % 12;
	hours = hours ? hours : 12;
	hours = hours.toString().padStart(2, "0");

	return `${hours}:${minutes} ${ampm}`;
}

export const ChatMessage: React.FC<MessageProps> = ({
	message,
	currentUser,
}) => {
	const isCurrentUser = message.senderId === currentUser;
	const { data } = useAppSelector((state: RootState) => state.user);

	const renderContent = () => {
		switch (message.contentType) {
			case "image":
				return (
					<img
						src={message.content}
						alt="User sent image"
						className="max-w-sm rounded-lg"
					/>
				);
			case "video":
				return (
					<video
						src={message.content}
						controls
						className="max-w-sm rounded-lg"
					></video>
				);
			case "application":
				return (
					<span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white p-2">
						<FaFilePdf className="w-5 h-5 text-red-100 " />
						<a
							href={message.content}
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-300 "
						>
							View PDF
						</a>
					</span>
				);
			default:
				return <p>{message.content}</p>;
		}
	};

	return (
		<div className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}>
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img
						src={
							isCurrentUser
								? data?.profile?.avatar
								: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
						}
						alt="User Avatar"
					/>
				</div>
			</div>

			<div
				className={`chat-bubble text-white ${
					isCurrentUser
						? "bg-gradient-to-r from-fuchsia-600 to-purple-600"
						: "bg-gradient-to-r from-slate-700 to-slate-800"
				}`}
			>
				{renderContent()}
				<div className="chat-header text-xs opacity-50 p-1 ">
					{formatChatTime(message.createdAt)}
				</div>
			</div>
			{isCurrentUser && (
				<div className="chat-footer text-xs opacity-50">
					{message.recieverSeen ? (
						<DoneAllIcon fontSize="small" color="info" />
					) : (
						<DoneIcon fontSize="small" />
					)}
				</div>
			)}
		</div>
	);
};
