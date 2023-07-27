import express from 'express'
const app = express()
import * as http from 'http'
const server = http.createServer(app)

import { Server } from "socket.io";
const io = new Server(server,{
    cors: {
        origin: "http://localhost:5173",
    },
});


app.get('/', (req, res) => {
    res.send('<h1>vite-typescript-webrtc-backend</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});