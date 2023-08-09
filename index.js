import { Server } from "socket.io";
import { createServer } from "http";
//import { readFileSync } from "fs";

const httpsServer = createServer({
    //key: readFileSync("C://Users/Alexander/Certificates/ssl/192.168.178.25.key"),
    //cert: readFileSync("C://Users/Alexander/Certificates/ssl/192.168.178.25.crt")
})

const io = new Server(httpsServer,{
    cors: {
        origin: "*"
    }
})

const port = process.env.PORT || 3001
httpsServer.listen(port)

io.on('connection', (socket) => {
    console.log(socket.id + " connected")
    sendClientListToEveryone(socket)
    socket.on('disconnect', () => {
        console.log(socket.id + " disconnected")
        sendClientListToEveryone(socket)
    })

    socket.on("offer", (offer) => {
        console.log(offer)
        socket.to(offer.toID).emit("offer", {
            fromID: socket.id,
            sdp: offer.sdp
        })
    })

    socket.on("answer", (answer) => {
        console.log(answer)
        socket.to(answer.toID).emit("answer", {
            fromID: socket.id,
            sdp: answer.sdp
        })
    })

    socket.on("new-ice-candidate", (ice) => {
        socket.to(ice.toID).emit("new-ice-candidate", ice)
    })
});


function sendClientListToEveryone(socket) {
    let clientList = []
    io.of("/").sockets.forEach(client => clientList.push(client.id))
    socket.broadcast.emit("list", clientList)
    socket.emit("list", clientList)
}

