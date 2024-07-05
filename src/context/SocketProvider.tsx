import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import React, { createContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface SocketContextType {
    socket: Socket | null;
    onlineUsers: { userId: string; socketId: string }[];
    setOnlineUsers: (users: { userId: string; socketId: string }[]) => void;
    currentRoom: string;
    setCurrentRoom: (room: string) => void;
}

interface SocketProviderProps {
    children: React.ReactNode;
}

const SOCKET_BACKEND_URL = import.meta.env.VITE_REACT_APP_SOCKET_BACKEND_URL;

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const { data } = useAppSelector((state: RootState) => state.user);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<{ userId: string; socketId: string }[]>([]);
    const [currentRoom, setCurrentRoom] = useState<string>("");

    const contextValues: SocketContextType = {
        socket,
        onlineUsers,
        setOnlineUsers,
        currentRoom, 
        setCurrentRoom,
    };

    useEffect(() => {
        if ((data?.role === "student" || data?.role === "instructor") && SOCKET_BACKEND_URL) {
            const newSocket: Socket = io(SOCKET_BACKEND_URL, {
                transports: ["websocket"],
            });

            newSocket.on("connect", () => {
                console.log("Socket connected at client");
                // if (data?._id) {
                //     console.log("Emitting new-user event with userId:", data._id);
                //     newSocket.emit("new-user", data._id);
                // }
            });

            newSocket.on("disconnect", () => {
                console.log("Socket disconnected");
            });

            setSocket(newSocket);

            // Cleanup
            return () => {
                newSocket.disconnect();
                console.log("socket disconnected frontend");
                
            };
        }
    }, [data]);

    return (
        <SocketContext.Provider value={contextValues}>
            {children}
        </SocketContext.Provider>
    );
};
