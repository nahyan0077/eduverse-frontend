import React from "react";
import { IoIosSend } from "react-icons/io";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { ChatMessage } from "./ChatMessage";

interface Message {
    sender: string;
    text: string;
    time: string;
}

interface ChatWindowProps {
    messages: Message[];
    currentUser: string;
    onSendMessage: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, currentUser, onSendMessage }) => {
    return (
        <section className="hidden lg:flex flex-col w-2/3 bg-white dark:bg-gray-900">
            <header className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="User Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                    <div className="font-bold text-gray-900 dark:text-white">Demo User 1</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Online</div>
                </div>
            </header>
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {messages.map((message, index) => (
                        <ChatMessage key={index} message={message} currentUser={currentUser} />
                    ))}
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
                        />
                        <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500" onClick={onSendMessage}>
                            <IoIosSend size={"30px"} />
                        </button>
                        <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500">
                            <KeyboardVoiceIcon fontSize="medium" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};