import express from 'express';
import { Server } from "socket.io";
import { createServer } from "http";

const PORT = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Removed trailing slash
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

io.on("connection",(socket) =>{
    console.log("User connected");
    console.log("ID", socket.id);

    // socket.emit("welcome", "Welcome to the server");

    // socket.broadcast.emit("welcome", `${socket.id} joined the server`);

    socket.on("message", (data) =>{
        console.log(data);
        socket.broadcast.emit("received message", data);
    })

    socket.on("disconnect", () =>{
        console.log("User disconnected", socket.id);
    })
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});