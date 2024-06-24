import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import React, { createContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface SocketContextType {
	socket: Socket | null;
}

interface SocketProviderProps {
	children: React.ReactNode;
}

const SOCKET_BACKEND_URL = import.meta.env.VITE_REACT_APP_SOCKET_BACKEND_URL;

export const SocketContext = createContext<SocketContextType>({ socket: null });

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
	const { data } = useAppSelector((state: RootState) => state.user);
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		if (data?.role === "student" || data?.role === "instructor") {
			const newSocket: Socket = io(SOCKET_BACKEND_URL, {
				transports: ["websocket"],
			});

			newSocket.on("connect", () => {
				console.log("socket connected at client");
			});

			setSocket(newSocket);

			// Cleanup
			return () => {
				newSocket.disconnect();
			};
		}
	}, [data]);

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};
