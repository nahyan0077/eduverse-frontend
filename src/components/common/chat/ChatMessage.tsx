import React from "react";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import SyncLoader from "react-spinners/SyncLoader";

interface MessageProps {
    message: {
        senderId: string;
        content: string;
        createdAt: string;
    };
    currentUser: string;
}

function formatChatTime(isoString: any) {
    const date = new Date(isoString);
    
    let hours: any = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours.toString().padStart(2, '0');
    
    return `${hours}:${minutes} ${ampm}`;
  }

export const ChatMessage: React.FC<MessageProps> = ({ message, currentUser }) => {
    const isCurrentUser = message.senderId === currentUser;
    const {data} = useAppSelector((state: RootState) => state.user)
    return (
        <div className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={isCurrentUser ? data?.profile?.avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} alt="User Avatar" />
                </div>
            </div>
            <div className="chat-header">
                <span className="text-xs opacity-50">{formatChatTime(message.createdAt)}</span>
            </div>
            {/* <div className={`chat-bubble  "bg-gradient-to-r from-slate-700 to-slate-800`}>
            <SyncLoader />
            </div> */}
            <div className={`chat-bubble ${isCurrentUser ? "bg-blue-700" : "bg-gradient-to-r from-slate-700 to-slate-800"}`}>
                {message.content}
            </div>
            <div className="chat-footer text-xs opacity-50">
                {isCurrentUser ? "Seen" : "Delivered"}
            </div>
        </div>
    );
};
