import React from "react";

interface MessageProps {
    message: {
        sender: string;
        text: string;
        time: string;
    };
    currentUser: string;
}

export const ChatMessage: React.FC<MessageProps> = ({ message, currentUser }) => {
    return (
        <div className={`chat ${message.sender === currentUser ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="User Avatar" />
                </div>
            </div>
            <div className="chat-header">
                <span className="text-xs opacity-50">{message.time}</span>
            </div>
            <div className={`chat-bubble ${message.sender === currentUser ? "bg-blue-700" : "bg-gradient-to-r from-slate-700 to-slate-800"}`}>
                {message.text}
            </div>
            <div className="chat-footer text-xs opacity-50">
                {message.sender === currentUser ? "Seen" : "Delivered"}
            </div>
        </div>
    );
};

