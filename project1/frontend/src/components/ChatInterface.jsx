import { useState, useEffect } from "react"
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io(`http://localhost:8000`);

export default function ChatInterface(){
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [isConnected, setIsConnected] = useState(false);
    
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");

    useEffect(() => {
        const onConnect = () => {
            setIsConnected(true);
            socket.emit('join-room', roomId);
        };

        const onDisconnect = () => {
            setIsConnected(false);
        };

        const onReceivingMessage = (data) => {
            setMessages((prevMessages) => [...prevMessages, data])
        }

        if (socket.connected) {
            onConnect();
        } else {
            socket.on('connect', onConnect);
        }

        socket.on('disconnect', onDisconnect);
        socket.on('receive-message', onReceivingMessage);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('receive-message', onReceivingMessage);
        }
    }, [roomId])

    const handleSendMessage = (e) => {
        e.preventDefault();

        if (messageInput.trim() === "") return;

        const messageData = {
            roomId,
            text: messageInput.trim(),
            senderId: socket.id,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        };
    
        // send to backend
        socket.emit('send-message', messageData);

        setMessages((prev) => [...prev, messageData]);
        setMessageInput("");
    };

    return (
        <>
            <div>
                <h1>Socket.io Room</h1>
                <h3>Current Room: {roomId}</h3>
                <p className="text-black">{isConnected ? 'connected🟢' : 'disconnected 🔴'}</p>
                <button onClick={() => navigate('/')}>Leave Room</button>
                <div>
                    {messages.length === 0 ? (
                        <p>No messages yet</p>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={index}>
                                <strong>{msg.senderId === socket.id ? "You" : "Other"}:</strong> {msg.text} 
                                <span style={{ fontSize: '0.8em', color: '#666', marginLeft: '8px' }}>({msg.timestamp})</span>
                            </div>
                        ))
                    )}
                </div>
                <form onSubmit={handleSendMessage}>
                    <input 
                        type="text" 
                        value={messageInput} 
                        onChange={(e) => setMessageInput(e.target.value)} 
                        placeholder="enter your message"
                    />
                    <button type="submit">SEND</button>
                    <button type="button" onClick={() => navigate('/')}>
                        Leave Room
                    </button>
                </form>
            </div>
        </>
    )
}

