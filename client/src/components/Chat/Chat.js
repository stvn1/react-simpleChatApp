import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client'
import './chat.css';
import TextContainer from '../TextContainer/TextContainer'

import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InforBar';
import Input from '../Input/Input';
let socket;





const Chat = ({location}) =>{
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const[message, setMessage] = useState('');
    const[messages, setMessages] = useState([]);
    const ENDPOINT = 'https://simple-chat-apptry.herokuapp.com';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
    
        socket = io(ENDPOINT);
    
        setRoom(room);
        setName(name)
    
        socket.emit('join', { name, room }, (error) => {
          if(error) {
            alert(error);
          }
        });

    },[ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
          setMessages([...messages, message ]);
        });
    
        socket.on('roomData', ({ users }) => {
          setUsers(users);
        })
    
        return () => {
          socket.emit('disconnect');
    
          socket.off();
        }
      }, [messages])
    
      const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
          socket.emit('sendMessage', message, () => setMessage(''));
        }
      }

    return (
        <div className="outerContainer">
            <div className= "container">

                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />



                {/*
                <input 
                value={message}
                onchange={(event) => setMessage(event.target.value)}
                onkeyPress= {event => event.key === 'Enter' ? sendMessage(event) : null}
                />
                */}

            </div>
            <TextContainer users={users}/>
        </div>
        
    )

}

export default Chat;