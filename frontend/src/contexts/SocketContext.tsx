import React, { createContext, useContext, useState } from "react";
import { Socket } from "socket.io-client";
import { socketInstance } from "../socket";

interface SocketContextInterface {
    socket: Socket;
    setSocket: React.Dispatch<React.SetStateAction<Socket>>;
};

const SocketContext = createContext<SocketContextInterface | null>(null);

export const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [socket, setSocket] =  useState<Socket>(socketInstance(null)!);

    return (
        <SocketContext.Provider value={{socket, setSocket}}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocketContext = () : SocketContextInterface => {
    const context =  useContext(SocketContext);
    if (!context) {
        throw new Error("useSocketContext must be used within a SocketContextProvider");
    }
    return context;
}
