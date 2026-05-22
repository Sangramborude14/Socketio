import { useState,useEffect } from "react"
import { io } from 'socket.io-client';

const socket = io(`http://localhost:8000`);

export default function App(){
    const [isConnected,setIsConnected] = useState(false);

    useEffect(() => {
        socket.on('connect',() => {
            setIsConnected(true)
        })
           

        socket.on('disconnect',() => {
            setIsConnected(false)})

    },[])
    return(<>
    <div>
        <h1>Socket.io</h1>
        <p className="text-black">{isConnected ? 'connected🟢': 'disconnected 🔴'}</p>
        </div>
        </>)
}
