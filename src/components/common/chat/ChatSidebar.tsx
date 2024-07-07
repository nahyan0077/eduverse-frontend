import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "react-loading-skeleton/dist/skeleton.css";
import { ChatListSkeleton } from "../loadingSkeleton/ChatList";

interface SidebarProps {
  users: any[];
  onlineUsers:
    | {
        userId: string;
        socketId: string;
      }[]
    | undefined;
  onCreateNewChat: (userId: string, isOnline: boolean | undefined) => void;
  loading: boolean;
  unreadCounts: { [chatId: string]: number };
}

export const ChatSidebar: React.FC<SidebarProps> = ({
  users,
  onlineUsers,
  onCreateNewChat,
  loading,
  unreadCounts,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user?.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="w-full lg:w-1/2 flex flex-col bg-gray-100 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-700 lg:h-[89vh]">
      <header className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search..."
            className="w-full p-3 pl-10 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </header>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {loading ? (
          <ChatListSkeleton />
        ) : (
          filteredUsers.map((user, index) => {
            const isOnline = onlineUsers?.some(
              (onlineUser) =>
                onlineUser.userId === (user._id || user.instructorRef?._id)
            );
            const userData = user;

            return (
              <div
                key={index}
                className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                onClick={() => onCreateNewChat(userData, isOnline)}>
                <div className="relative w-12 h-12 mr-4">
                  <img
                    src={user?.profile?.avatar}
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                  {isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="text-gray-900 dark:text-white font-bold">
                    {user?.userName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.role}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  {unreadCounts[user.chatId] > 0 && (
                    <span className="border border-violet-700 text-white text-xs font-bold px-2 py-1 rounded-full mb-1">
                      {unreadCounts[user.chatId]}
                    </span>
                  )}
                  <span
                    className={`text-xs ${
                      isOnline
                        ? "text-green-500"
                        : "text-gray-400 dark:text-gray-500"
                    }`}>
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
