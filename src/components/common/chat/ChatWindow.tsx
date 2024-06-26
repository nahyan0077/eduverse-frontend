import React, { useState, useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { ChatMessage } from "./ChatMessage";

interface Message {
    senderId: string;
    content: string;
    createdAt: string;
}

interface ChatWindowProps {
    messages: Message[];
    currentUser: string;
    onSendMessage: (message: string) => void;
    currentChat: any;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
    messages,
    currentUser,
    onSendMessage,
    currentChat,
}) => {
    const [inputMessage, setInputMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            onSendMessage(inputMessage);
            setInputMessage("");
        }
    };

    return (
        <section className="hidden lg:flex flex-col w-2/3 bg-white dark:bg-gray-900">
            {currentChat ? (
                <>
                    <header className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img
                                src={currentChat?.profile?.avatar}
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <div className="font-bold text-gray-900 dark:text-white">
                                {currentChat.userName}
                            </div>
                            <div className={`text-sm text-gray-500 dark:text-gray-400`}>
                                {currentChat.isOnline ? "Online" : "Offline"}
                            </div>
                        </div>
                    </header>
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {messages.map((message, index) => (
                                <ChatMessage
                                    key={index}
                                    message={message}
                                    currentUser={currentUser}
                                />
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500">
                                    <EmojiEmotionsIcon fontSize="medium" />
                                </button>
                                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500">
                                    <AttachFileIcon fontSize="medium" />
                                </button>
                                <input
                                    type="text"
                                    className="flex-grow p-2 bg-transparent text-gray-900 dark:text-white focus:outline-none"
                                    placeholder="Type a message"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") handleSendMessage();
                                    }}
                                />
                                <button
                                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500"
                                    onClick={handleSendMessage}
                                >
                                    <IoIosSend size={30} />
                                </button>
                                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500">
                                    <KeyboardVoiceIcon fontSize="medium" />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                    Select a chat to start messaging
                </div>
            )}
        </section>
    );
};
