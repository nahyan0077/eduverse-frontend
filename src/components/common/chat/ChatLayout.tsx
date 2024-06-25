import React from "react";

import { ChatSidebar } from "./ChatSidebar";
import { ChatWindow } from "./ChatWindow";

interface ChatLayoutProps {
    users: string[];
    messages: [];
    currentUser: string;
    onSendMessage: () => void;
}

export const ChatLayout: React.FC<ChatLayoutProps> = ({ users, messages, currentUser, onSendMessage }) => {
    return (
        <div className="flex h-full bg-gray-900">
            <ChatSidebar users={users} />
            <ChatWindow messages={messages} currentUser={currentUser} onSendMessage={onSendMessage} />
        </div>
    );
};


