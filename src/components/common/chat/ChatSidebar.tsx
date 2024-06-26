import React from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SidebarProps {
    users: any[];
    onlineUsers: {
        userId: string;
        socketId: string;
    }[] | undefined;
    onCreateNewChat: (userId: string, isOnline: boolean | undefined) =>  void; 
}

export const ChatSidebar: React.FC<SidebarProps> = ({ users, onlineUsers, onCreateNewChat }) => {
    return (
        <section className="w-full lg:w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col bg-gray-50 dark:bg-gray-900">
            <header className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full p-3 pl-10 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </header>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {users?.map((user, index) => {
                    const isOnline = onlineUsers?.some(
                        (onlineUser) =>
                            onlineUser.userId ===
                            (user._id || user.instructorRef?._id)
                    );
                    const userData = user;

                    return (
                        <div
                            key={index}
                            className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 rounded-md cursor-pointer"
                            onClick={() => onCreateNewChat(userData,isOnline)}
                        >
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 relative">
                                <img
                                    src={
                                        user?.profile?.avatar 
                                    }
                                    alt="User Avatar"
                                    className="w-full h-full object-cover"
                                />
                                {isOnline && (
                                    <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="text-gray-900 dark:text-white font-bold">
                                    {user?.userName}
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {user?.role}
                                </p>
                            </div>
                            <div className="ml-2">
                                {isOnline ? (
                                    <span className="text-xs text-green-500">Online</span>
                                ) : (
                                    <span className="text-xs text-gray-400 dark:text-gray-500">
                                        Offline
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};