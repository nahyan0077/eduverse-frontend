import { ChatMessageSection } from "@/components/common/chat/ChatWindow";
import { ChatUsersSection } from "@/components/common/chat/ChatSidebar";
import React from "react";

export const Chat : React.FC = () => {
    return (
        <>
            <div className="flex" >
                <ChatUsersSection />
                <ChatMessageSection/>
            </div>
        </>
    )
}