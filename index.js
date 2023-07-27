import { Server } from "socket.io";


const io = new Server(3001,{
    cors: {
        origin: "http://localhost:5173",
    },
});


io.on('connection', (socket) => {
    console.log(socket.id + " connected")
    socket.on('disconnect', () => console.log(socket.id + " disconnected"))
});
