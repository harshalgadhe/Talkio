import { Server } from "socket.io";

export const createSockets = (httpServer) => {
    
    let socketConnections = {};

    const io = new Server(httpServer, { 
        cors: {
            origin: process.env.FRONTEND_URL
        }
     });
    
    
    io.on("connection", (socket) => {
        const userId = socket.handshake.auth.userId;
        if(userId !== null && userId !== undefined){
            console.log(`${userId} with socket ${socket.id}`);
            socketConnections[userId] = socket;
            socket.on('message', (arg) => {
                console.log("Sending message")
                const receiever = arg['to'];
                if(socketConnections[receiever]){
                    arg['is_sender'] = false;
                    console.log(arg);
                    console.log(`Sending message to socket it ${socketConnections[receiever].id} - ${receiever}`)
                    socketConnections[receiever].emit('new send message', arg);
                }
            })
        }
    });
}
