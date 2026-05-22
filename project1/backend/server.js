const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const roomRouter = require('./routes/roomRouter');

const PORT = 8000;
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
}));
app.use(express.json());

// Mount API routes
app.use('/api/rooms', roomRouter);

 const server = http.Server(app);

const io = new Server(server,{
    cors: {
        origin:"http://localhost:5173",
        methods:["GET", "POST"]
    }
});//attach socket.io to the HTTP server 


io.on('connection', (socket) => {
    console.log(`user connected ${socket.id}`)
    
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room : ${roomId}`);
        io.to(roomId).emit('hello everyone');
    });
})


server.listen(PORT,() =>{
    console.log(`server running at http://localhost:${PORT}`);
});


