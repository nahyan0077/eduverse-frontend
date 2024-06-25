import React from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SidebarProps {
    users: any[];
}

export const ChatSidebar: React.FC<SidebarProps> = ({ users }) => {
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
                {users?.map((user, index) => (
                    <div key={index} className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 rounded-md">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img src={user?.userId?.profile?.avatar || user?.instructorRef?.profile?.avatar} alt="User Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-gray-900 dark:text-white font-bold">{user?.userId?.userName || user?.instructorRef?.userName}</div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.userId?.role || user?.instructorRef?.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};