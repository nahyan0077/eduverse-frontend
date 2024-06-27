import React, { useContext, useEffect, useState } from "react";
import { ChatSidebar } from "../common/chat/ChatSidebar";
import { ChatWindow } from "../common/chat/ChatWindow";
import { SocketContext } from "@/context/SocketProvider";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import { createMessageAction, getChatsByUserIdAction, getMessagesByChatIdAction } from "@/redux/store/actions/chat";

export const StudentChat: React.FC = () => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state: RootState) => state.user);
    const [currentChat, setCurrentChat] = useState<any>(null);
    const [chats, setChats] = useState<any[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [typingData, setTypingData] = useState<{ isTyping: boolean, senderId: string } | null>(null);
    const { socket, onlineUsers, setOnlineUsers } = useContext(SocketContext) || {};

    useEffect(() => {
        socket?.on("online-users", (users) => {
            setOnlineUsers && setOnlineUsers(users);
        });

        if (data?._id && socket) {
            console.log("Emitting new-user event with userId:", data._id);
            socket.emit("new-user", data._id);
        }

        socket?.on("receive-message", (message) => {
            console.log(message, "new message");
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        socket?.on("isTyping", (senderId) => {
            console.log(senderId, "is typing", currentChat?._id);
            if (senderId === currentChat?._id) {
                setTypingData({ isTyping: true, senderId });
                setTimeout(() => {
                    setTypingData({ isTyping: false, senderId });
                }, 2000);
            }
        });

        return () => {
            socket?.off("new-user");
            socket?.off("online-users");
            socket?.off("receive-message");
            socket?.off("isTyping");
        };
    }, [socket, setOnlineUsers, currentChat, data?._id]);

    useEffect(() => {
        fetchChatsByUserId();
    }, [data, dispatch]);

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
                    lastSeen: chat?.lastSeen,
                };
            });
            setChats(chatData);
        }
    };

    const createPrivateRoomId = (id1: string, id2: string) => {
        return id1 > id2 ? `${id1}_${id2}` : `${id2}_${id1}`;
    };

    const handleCreateNewChat = async (receiverData: any, isOnline: any) => {
        if (data?._id) {
            const newRoomId = createPrivateRoomId(data?._id, receiverData._id);
            setRoomId(newRoomId);
            socket?.emit("join-room", newRoomId);
            setCurrentChat({ ...receiverData, isOnline, roomId: newRoomId });

            const response = await dispatch(getMessagesByChatIdAction(receiverData.chatId));
            setMessages(response.payload.data);
        }
    };

    const onSendMessage = async ({ content , contentType }: any) => {
        console.log(content,contentType, "message---->");

        if (roomId && currentChat && data?._id) {
            const newMessage = {
                roomId,
                chatId: currentChat?.chatId,
                senderId: data?._id,
                content,
                contentType
            };
            socket?.emit("send-message", newMessage);
            await dispatch(createMessageAction(newMessage));
        }
    };

    return (
        <div className="flex h-full bg-gray-900">
            <ChatSidebar users={chats} onlineUsers={onlineUsers} onCreateNewChat={handleCreateNewChat} />
            <ChatWindow
                messages={messages}
                currentUser={data?._id || ""}
                onSendMessage={onSendMessage}
                currentChat={currentChat}
                typingData={typingData}
            />
        </div>
    );
};
