import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Dashboard(){
    const [roomId, setRoomId] = useState("");
    const navigate = useNavigate();

    const handleJoin = async () => {
        if (!roomId.trim()) return;
        
        try {
            const response = await fetch("http://localhost:8000/api/rooms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ roomId: roomId.trim() })
            });
            
            if (response.ok) {
                console.log(`roomId received successfully`);
                navigate(`/${roomId.trim()}`);
            } else {
                console.error("Failed to submit roomId");
            }
        } catch (error) {
            console.error(`Error occurred while fetching: ${error}`);
        }
    };


    return (
        <>
            <h3>enter your room no:</h3>
            <input 
                value={roomId} 
                type="text" 
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter room number"
            />
            <button onClick={handleJoin}>
                JOIN
            </button>
        </>
    );
}