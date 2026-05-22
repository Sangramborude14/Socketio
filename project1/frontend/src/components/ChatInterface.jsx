import { useState, useEffect } from "react"
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io(`http://localhost:8000`);

export default function ChatInterface(){
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const onConnect = () => {
            setIsConnected(true);
            socket.emit('join-room', roomId);
        };

        const onDisconnect = () => {
            setIsConnected(false);
        };

        if (socket.connected) {
            onConnect();
        } else {
            socket.on('connect', onConnect);
        }

        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        }
    }, [roomId])


    return (
        <>
            <div>
                <h1>Socket.io Room</h1>
                <h3>Current Room: {roomId}</h3>
                <p className="text-black">{isConnected ? 'connected🟢' : 'disconnected 🔴'}</p>
                <button onClick={() => navigate('/')}>Leave Room</button>
            </div>
        </>
    )
}

