import React, { useContext, useEffect, useState } from "react";
// import { ChatSidebar } from "../common/chat/ChatSidebar";
import { ChatWindow } from "../common/chat/ChatWindow";
import { ChatSidebar } from "../common/chat/ChatSidebar";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getInstructorsByStudentAction } from "@/redux/store/actions/enrollment";
import { RootState } from "@/redux/store";
import { SocketContext } from "@/context/SocketProvider";
import { getChatsByUserIdAction } from "@/redux/store/actions/chat";

export const StudentChat: React.FC = () => {

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


    const dispatch = useAppDispatch()
    const {data} = useAppSelector((state: RootState) => state.user)
    const [users, setUsers] = useState([])
    const { socket, onlineUsers, setOnlineUsers, currentRoom, setCurrentRoom } = useContext(SocketContext) || {}
	const [currentChat, setCurrentChat] = useState<any>(null);
    useEffect(()=>{
        socket?.on("online-users",(users)=>{
            setOnlineUsers && setOnlineUsers(users)
        })

    },[socket])
    
	
    useEffect(()=>{
        fetchInstructorsByStudent()
    },[dispatch])

    

    const fetchInstructorsByStudent = async () => {
        if (data?._id) {
            const response = await dispatch(getInstructorsByStudentAction(data?._id))
            console.log(response.payload.data,"chat studetn instructors");
            setUsers(response?.payload?.data)
            console.log(users,"usdfse studen inst");
        }
    } 

    const createPrivateRoomId = (id1: string, id2: string) => {
        id1 > id2 ? id1 + "_" + id2 : id2 + "_" + id1
    }

    const handleCreateNewChat = (receiverData: any,isOnline: any) => {
		console.log(receiverData,isOnline,"sender data");
		
		setCurrentChat({...receiverData,isOnline})
        if (data?._id) {
            const roomId = createPrivateRoomId(data?._id, receiverData._id);
            const newChatRoom = {
                roomId,
                receiverId: receiverData?._id
            };
            socket?.emit("join-room", newChatRoom);

        }
    };

    const onSendMessage = () => {
		console.log("Send message");
	};

	useEffect(() => {
		fetchChatsByUserId();
	}, [data]);

	const fetchChatsByUserId = async () => {
		if (data?._id) {
			const response = await dispatch(getChatsByUserIdAction(data?._id));
			console.log(response,"get chat by userid");
			
		}
	};

	return (
		<>
			<div className="flex h-full bg-gray-900">
				<ChatSidebar users={users} onlineUsers={onlineUsers} onCreateNewChat={handleCreateNewChat} />
				<ChatWindow
					messages={messages}
					currentUser={"user"}
					onSendMessage={onSendMessage}
					currentChat={currentChat}
				/>
			</div>
		</>
	);
};
