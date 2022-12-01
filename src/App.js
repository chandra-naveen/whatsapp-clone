
import './App.css';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import SideBar from './components/SideBar';
import Chat from './components/Chat';
import Login from './components/Login';
import { useStateValue } from './components/StateProvider';



function App() {
  const [{user} , dispatch] = useStateValue()
  return (
    <div className="app">
{!user ? <Login/>:(
  <div className='app__body'>
        <Router>
          <SideBar />
          <Routes>
            <Route path="/rooms/:roomId" element={<Chat/>}/>
            <Route path="/" element={<Chat/>}/>

          </Routes>
        </Router>
      </div>
)}

    </div>
  );
}

export default App;
