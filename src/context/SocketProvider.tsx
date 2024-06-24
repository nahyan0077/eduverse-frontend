import React, { createContext } from "react";
import io, { Socket } from "socket.io-client";

interface SocketContextType {
	socket: Socket;
}

interface SocketProviderProps {
	children: React.ReactNode;
}

const socket: Socket = io(import.meta.env.VITE_REACT_APP_SOCKET_BACKEND_URL, {
	transports: ["websocket"],
});

export const SocketContext = createContext<SocketContextType>({ socket });

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};
