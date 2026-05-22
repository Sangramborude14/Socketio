import { useState, useEffect } from "react"
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io(`http://localhost:8000`);

export default function ChatInterface(){
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [isConnected, setIsConnected] = useState(false);
    const [chat,setChat] = useState("");
    const [message,setMessage] = useState("");

    useEffect(() => {
        const onConnect = () => {
            setIsConnected(true);
            socket.emit('join-room', roomId);
        };

        async function display(){
            try{
                const response = await fetch(`http://localhost:8000/api/:${roomId}`,{
                    METHOD: "GET"
                })
                const data = await response.json()

            }catch(error){
                console.log(`error fetching data from backend`)
            }
        }

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

    const pushMessage = async () => {
        const reply = document.getElementById("userReply").value;
        setMessage(reply)
        const response = await fetch(`http://localhost:8000/api/:${roomId}`,{
            method: "POST",
        })

    }

    return (
        <>
            <div>
                <h1>Socket.io Room</h1>
                <h3>Current Room: {roomId}</h3>
                <p className="text-black">{isConnected ? 'connected🟢' : 'disconnected 🔴'}</p>
                <button onClick={() => navigate('/')}>Leave Room</button>
                <div>
                    <p></p>
                    <input type="text" value={message} id="userReply" onChange={(e) => setMessage(e.target.value)}/>
                    <button onClick={pushMessage}>SEND</button>
                </div>
            </div>
        </>
    )
}

