import React, { useContext, useEffect, useState } from "react";
import { ChatSidebar } from "../common/chat/ChatSidebar";
import { ChatWindow } from "../common/chat/ChatWindow";
import { SocketContext } from "@/context/SocketProvider";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getStudentsEnrolledByInstructorAction } from "@/redux/store/actions/enrollment";
import { RootState } from "@/redux/store";

export const InstructorChat: React.FC = () => {
	const dispatch = useAppDispatch();
	const { data } = useAppSelector((state: RootState) => state.user);
	const [studentsEnrolledByInstructor, setStudentsEnrolledByInstructor] =
		useState([]);

	const messages = [
		{ sender: "other", text: "You were the Chosen One!", time: "12:45" },
		{ sender: "user", text: "I hate you!", time: "12:46" },
		{
			sender: "other",
			text: "It's over Anakin, I have the high ground!",
			time: "12:47",
		},
		{ sender: "user", text: "You underestimate my power!", time: "12:48" },
		{ sender: "other", text: "Don't try it.", time: "12:49" },
		{
			sender: "user",
			text: "You were my brother, Anakin! I loved you.",
			time: "12:50",
		},
		{ sender: "other", text: "I HATE YOU!", time: "12:51" },
		{
			sender: "user",
			text: "You were supposed to destroy the Sith, not join them!",
			time: "12:52",
		},
		{
			sender: "other",
			text: "Bring balance to the Force, not leave it in darkness!",
			time: "12:53",
		},
		{ sender: "user", text: "I will do what I must.", time: "12:54" },
		{ sender: "other", text: "You will try.", time: "12:55" },
	];

	const users = ["Demo User 1", "Demo User 2", "Demo User 3"];

	const currentUser = "user";

	const onSendMessage = () => {
		console.log("Send message");
	};

	const { socket, onlineUsers, setOnlineUsers } =
		useContext(SocketContext) || {};

	useEffect(() => {
		socket?.on("online-users", (users) => {
			setOnlineUsers && setOnlineUsers(users);
		});
	}, [socket]);

	useEffect(() => {
		fetchEnrollments();
	}, [dispatch]);

	const fetchEnrollments = async () => {
		if (data?._id) {
			const response = await dispatch(
				getStudentsEnrolledByInstructorAction(data?._id)
			);
			console.log(response, "get all stundtt");
			setStudentsEnrolledByInstructor(response.payload.data);
		}
	};

	console.log(onlineUsers, "these are socket online userse");

	return (
		<div className="flex h-full bg-gray-900">
			<ChatSidebar users={studentsEnrolledByInstructor} />
			<ChatWindow
				messages={messages}
				currentUser={"user"}
				onSendMessage={onSendMessage}
			/>
		</div>
	);
};
