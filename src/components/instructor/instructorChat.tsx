import React, { useContext, useEffect, useState } from "react";
import { ChatSidebar } from "../common/chat/ChatSidebar";
import { ChatWindow } from "../common/chat/ChatWindow";
import { SocketContext } from "@/context/SocketProvider";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getStudentsEnrolledByInstructorAction } from "@/redux/store/actions/enrollment";
import { RootState } from "@/redux/store";
import { getChatsByUserIdAction, getMessagesByChatIdAction } from "@/redux/store/actions/chat";

export const InstructorChat: React.FC = () => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state: RootState) => state.user);
    const [studentsEnrolledByInstructor, setStudentsEnrolledByInstructor] = useState([]);
    const [currentChat, setCurrentChat] = useState<any>(null);
    const [chats, setChats] = useState<any[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [roomId, setRoomId] = useState<string | null>(null);

    const { socket, onlineUsers, setOnlineUsers } = useContext(SocketContext) || {};

    useEffect(() => {
        socket?.on("online-users", (users) => {
            setOnlineUsers && setOnlineUsers(users);
        });

        // socket?.on("receive-message", (message) => {
		// 	console.log(message,"my messages")
			
        //     setMessages((prevMessages) => [...prevMessages, message]);
        // });

        return () => {
            socket?.off("online-users");
            socket?.off("receive-message");
        };
    }, [socket]);


    useEffect(() => {
        fetchEnrollments();
    }, [dispatch]);

    useEffect(() => {
        fetchChatsByUserId();
    }, [data, socket]);

    const fetchChatsByUserId = async () => {
        if (data?._id) {
            const response = await dispatch(getChatsByUserIdAction(data?._id));
            const chatData = response.payload.data.map((chat: any) => {
                const participant = chat?.participants.find((participantId: any) => participantId._id !== data?._id);
                return {
                    ...participant,
                    name: participant.userName,
                    chatId: chat._id,
                    receiverId: participant._id,
                    createdAt: Date.now(),
                };
            });
            setChats(chatData);
        }
    };

    const fetchEnrollments = async () => {
        if (data?._id) {
            const response = await dispatch(getStudentsEnrolledByInstructorAction(data?._id));
            setStudentsEnrolledByInstructor(response.payload.data);
        }
    };


    const createPrivateRoomId = (id1: string, id2: string) => {
        return id1 > id2 ? id1 + "_" + id2 : id2 + "_" + id1;
    };

    const handleCreateNewChat = async (receiverData: any, isOnline: any) => {
        setCurrentChat({ ...receiverData, isOnline });
        if (data?._id) {
            const roomId = createPrivateRoomId(data?._id, receiverData._id);
            setRoomId(roomId);
            socket?.emit("join-room", roomId);
            // Fetch messages for the selected chat if needed

			const response = await dispatch(getMessagesByChatIdAction(currentChat?.chatId))
			console.log(response,"fetch messaeges");
			
        }

    };

    const onSendMessage = (message: string) => {
        if (roomId && currentChat && data?._id) {
            const newMessage = {
                roomId,
                chatId: currentChat?.chatId,
                senderId: data?._id,
                content: message,
            };
            socket?.emit("send-message", newMessage);

            setMessages((prevMessages) => [...prevMessages, newMessage]);

			

        }
    };

    return (
        <div className="flex h-full bg-gray-900">
            <ChatSidebar users={chats} onlineUsers={onlineUsers} onCreateNewChat={handleCreateNewChat} />
            <ChatWindow
                messages={messages}
                currentUser={data?._id}
                onSendMessage={onSendMessage}
                currentChat={currentChat}
            />
        </div>
    );
};
