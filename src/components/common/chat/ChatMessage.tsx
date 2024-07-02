import React, { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";
import { FaFilePdf } from "react-icons/fa";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ConfirmModal from "../modal/ConfirmModal";
import { updateMessageAction } from "@/redux/store/actions/chat/updateMessageAction";
import ErrorIcon from "@mui/icons-material/Error";
import { SocketContext } from "@/context/SocketProvider";

interface MessageProps {
	message: {
		senderId: string;
		content: string;
		createdAt: string;
		receiverSeen: boolean;
		contentType: string;
		chatId?: string;
		_id?: string;
		isDeleted?: boolean;
	};
	currentUser: string;
	currentChat: any;
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
	currentChat,
}) => {
	const isCurrentUser = message.senderId === currentUser;
	const { data } = useAppSelector((state: RootState) => state.user);
	const dispatch = useAppDispatch();
	const [isModalVisible, setModalVisible] = useState(false);
	const { socket } = useContext(SocketContext) || {};

	const handleDeleteChat = () => {
		setModalVisible(true);
	};

	

	const handleDelete = async () => {
		console.log(currentChat, "cur uder check");

		if (message?.chatId) {
			await dispatch(updateMessageAction({_id:message?._id, isDeleted: true}));
			socket?.emit("delete-message",{messageId:message?._id, roomId:currentChat?.roomId})
			setModalVisible(false);
		}
	};

	const handleCancel = () => {
		setModalVisible(false);
	};

	const renderContent = () => {
		switch (message.contentType) {
			case "image":
				return (
					<img
						src={message.content}
						alt="User sent image"
						className=" w-40 lg:w-64 rounded-lg"
					/>
				);
			case "video":
				return (
					<video
						src={message.content}
						controls
						className="w-40 lg:w-64 rounded-lg"
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
			case "audio":
				return (
					<div className="mb-2 pr-5 pt-3  rounded-lg w-full">
						<audio
							src={message.content}
							controls
							preload="metadata"
							className="w-40 lg:w-60 "
							onError={(e) => console.error("Audio playback error:", e)}
						>
							Your browser does not support the audio element.
						</audio>
					</div>
				);
			default:
				return <p>{message.content}</p>;
		}
	};

	return (
		<>
			{isModalVisible && (
				<ConfirmModal
					message="delete this message ?"
					onConfirm={handleDelete}
					onCancel={handleCancel}
				/>
			)}
			<div className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}>
				<div className="chat-image avatar">
					<div className="w-10 rounded-full">
						<img
							src={
								isCurrentUser
									? data?.profile?.avatar
									: currentChat?.profile?.avatar
							}
							alt="User Avatar"
						/>
					</div>
				</div>
				<div className="flex">
					{isCurrentUser && !message.isDeleted && (
						<div className="flex items-center">
							<div className="dropdown dropdown-left">
								<div tabIndex={0} role="button" className="">
									<MoreVertIcon fontSize="small" />
								</div>
								<ul
									tabIndex={0}
									className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
								>
									<li>
										<a onClick={handleDeleteChat}>Delete for everyone</a>
									</li>
								</ul>
							</div>
						</div>
					)}
					<div
						className={`chat-bubble text-white rounded-3xl ${
							isCurrentUser ? "lg:ml-2" : "lg:ml-6"
						} text-sm ${
							isCurrentUser
								? "bg-gradient-to-r from-fuchsia-600 to-purple-600"
								: "bg-gradient-to-r from-slate-700 to-slate-800"
						}`}
					>
						{message?.isDeleted ? (
							<span className="italic text-sm">
								<ErrorIcon />
								This message is deleted
							</span>
						) : (
							renderContent()
						)}
						<div className="chat-header text-xs opacity-50 p-1 ">
							{formatChatTime(message.createdAt)}
						</div>
					</div>
				</div>
				{isCurrentUser && (
					<div className="chat-footer text-xs opacity-50 p-2">
						{message.receiverSeen ? (
							"Seen"
						) : (
							"Delivered"
						)}
					</div>
				)}
			</div>
		</>
	);
};
