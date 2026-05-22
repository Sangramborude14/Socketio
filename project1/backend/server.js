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
    console.log(`user connected ${socket.id}`);
    
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room : ${roomId}`);
        // Broadcast welcome message to other room members
        socket.to(roomId).emit('receive-message', {
            senderId: 'System',
            text: `User ${socket.id} has joined the room.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
    });

    socket.on('send-message', (data) => {
        console.log(`Message received for room ${data.roomId}`, data);
        // Broadcast message to everyone in the room except the sender
        socket.to(data.roomId).emit('receive-message', data);
    });

    socket.on('disconnect', () => {
        console.log(`user disconnected ${socket.id}`);
    });
})



server.listen(PORT,() =>{
    console.log(`server running at http://localhost:${PORT}`);
});


