import { Socket, io } from 'socket.io-client';

const connectedUsers : Map<String,Socket> = new Map();

export function socketInstance(userId: string | null) {

    let socket : Socket;
    if(userId === null || userId === undefined){
        socket = io(process.env.REACT_APP_BACKEND_URL!);
    } else {
        if(connectedUsers.has(userId)){
            return connectedUsers.get(userId);
        }
        socket = io(process.env.REACT_APP_BACKEND_URL!, {
            auth: {
                userId: userId
            }
        });
        socket.on("connect", () => {
            console.log(`connected with socket id ${socket.id}`);
        });
        connectedUsers.set(userId, socket);
    }

    return socket;
}