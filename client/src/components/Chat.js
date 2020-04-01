import React,{useState, useEffect} from 'react'
import queryString from 'query-string';
import io from 'socket.io-client';

export default function Chat({location}) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket] = useState(() => io(':5000'));
    

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        setRoom(room);
        setName(name);
        
        socket.emit('join', { name, room });

        socket.on('message', (message)=>{
            setMessages([...messages,message])
        });

        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }
    }, [socket])

    //function for sending messages
    const sendMessage=(event)=>{
        event.preventDefault();
        
        if(message){
            socket.emit('sendMessage', message);
            setMessage('');
        }
    }
    console.log(message,messages);
    
    return (
        <div>
            <div>
                <input 
                    value={message} 
                    onChange={(event)=>setMessage(event.target.value)} 
                    onKeyPress={(event)=> event.key === 'Enter' ? sendMessage(event) : null}
                />
            </div>
        </div>
    )
}
