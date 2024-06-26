import React from "react";

interface MessageProps {
    message: {
        senderId: string;
        content: string;
        createdAt: string;
    };
    currentUser: string;
}

export const ChatMessage: React.FC<MessageProps> = ({ message, currentUser }) => {
    const isCurrentUser = message.senderId === currentUser;
    return (
        <div className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="User Avatar" />
                </div>
            </div>
            <div className="chat-header">
                <span className="text-xs opacity-50">{message.createdAt}</span>
            </div>
            <div className={`chat-bubble ${isCurrentUser ? "bg-blue-700" : "bg-gradient-to-r from-slate-700 to-slate-800"}`}>
                {message.content}
            </div>
            <div className="chat-footer text-xs opacity-50">
                {isCurrentUser ? "Seen" : "Delivered"}
            </div>
        </div>
    );
};
