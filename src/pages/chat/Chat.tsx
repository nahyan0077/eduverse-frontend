import { ChatMessageSection } from "@/components/common/chat/ChatMessageSection";
import { ChatUsersSection } from "@/components/common/chat/ChatUsersSection";
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