import React, { useEffect, useState } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@mui/material'
import { AttachFile } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { InsertEmoticon } from '@mui/icons-material';
import MicIcon from '@mui/icons-material/Mic'
import db from '../firebase'
import {useParams} from 'react-router-dom'
import { useStateValue } from './StateProvider';
import firebase from 'firebase/compat/app';

const Chat = () => {
    const [seed, setSeed] = useState('');
    const [input, setInput]=useState("");
    const {roomId} =useParams();
    const [roomName, setRoomName]=useState("");
    const [messages, setMessages]=useState([])
    const [{user} , dispatch] = useStateValue()

    useEffect(()=>{
if(roomId){
    db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
        setRoomName(snapshot.data().name)
    ))

    db.collection("rooms")
    .doc(roomId)
    .collection("messages")
    .orderBy("timestamp", "asc")
    .onSnapshot(snapshot=>setMessages(snapshot.docs.map(doc=>doc.data())))
}
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

const sentMessage = (e) =>{
e.preventDefault();
db.collection('rooms').doc(roomId).collection('messages').add({
    message: input,
    name: user.displayName,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
})
setInput('')
}



    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/b${seed}.svg`} />
                <div className='chat__headerInfo'>
                    <h3>{roomName}</h3>
                    <p>Last seen {""}
                    {new Date(messages[messages.length-1]?.timestamp?.toDate( )).toUTCString()}
                    </p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </div>
            </div>
            <div className='chat__body'>
                {messages.map(message => ( 
                    <p className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
                    <span className="chat__name">
                        {message.name}
                    </span>
            {message.message}
                    <span className='chat__timestamp'>{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                </p>
                ))}
               
            </div>
            <div className='chat__footer'>
                <InsertEmoticon />
                <form>
                    <input 
                    value={input}
                    onChange={e=> setInput(e.target.value)}
                    placeholder='Type your message' type="text" />
                    <button  onClick={sentMessage} type="submit">Send a message</button>
                </form>
                <MicIcon />

            </div>

        </div>
    )
}

export default Chat