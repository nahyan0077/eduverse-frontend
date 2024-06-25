import React from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SidebarProps {
    users: string[];
}

export const ChatSidebar: React.FC<SidebarProps> = ({ users }) => {
    return (
        <section className="w-full lg:w-1/3 border-r border-gray-800 flex flex-col">
            <header className="p-4 border-b border-gray-800">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </header>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {users.map((user, index) => (
                    <div key={index} className="flex items-center p-4 border-b border-gray-800 hover:bg-gray-800 transition-colors duration-200 rounded-md">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="User Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-white">{user}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

