const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const PORT = 8000;
const app = express();
const server = http.Server(app);

const io = new Server(server,{
    cors: {
        origin:"http://localhost:5173",
        methods:["GET", "POST"]
    }
});//attach socket.io to the HTTP server 

io.on('connection',(socket) => {
    console.log(`user connected ${socket.id}`)
    socket.join('room-id');

    io.to('room-id').emit('hello everyone');
})

server.listen(PORT,() =>{
    console.log(`server running at http://localhost:${PORT}`);
});


