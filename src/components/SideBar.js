import React, {useEffect, useState}from 'react'
import './SideBar.css';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SideBarChat from './SideBarChat';
import db from '../firebase';
import { useStateValue } from './StateProvider';


const SideBar = () => {

const[rooms, setRooms] = useState([])
const [{user} , dispatch] = useStateValue()

useEffect(()=>{
db.collection('rooms').onSnapshot(snapshot =>(
    setRooms(snapshot.docs.map(doc=>(
        {
            id:doc.id,
            data:doc.data()
        }
    )))
))
},[])

  return (
    <div className='sidebar'>
        <div className='sidebar__header'>
            <Avatar src={user?.photoURL}/>
            <div className='sidebar__headerRight'>
<IconButton>
    <DonutLargeIcon/>
</IconButton>
<IconButton>
    <ChatIcon/>
</IconButton>
<IconButton>
    <MoreVertIcon/>
</IconButton>
            </div>
        </div>
        <div className='sidebar__search'>
            <div className='sidebar_searchContainer'>
<SearchOutlinedIcon/>
<input placeholder='Searh or start a new chat' type="text"/>
            </div>
        </div>
        <div className='sidebar__chats'>
            <SideBarChat addNewChat />
            {rooms.map(room=><SideBarChat key={room.id} id={room.id} name={room.data.name}/>)}
        </div>
    </div>
  )
}

export default SideBar