import React from 'react';
// import React,{useState,useEffect} from 'react';
import './App.css';
import {Router, Link} from '@reach/router'
import {BrowserRouter,Route} from 'react-router-dom';

// import { H1 } from '@material-ui/core';
import CountryList from './views/CountryList';
import SearchForm from './components/SearchForm';
import CountryDetail from './views/CountryDetail';
import Registration from './views/Registration';
import LogoutButton from './components/LogoutButton';
import LoginForm from './views/LoginForm';
// import io from 'socket.io-client';
import Join from './components/Join';
import Chat from './components/Chat';

function App() {
//   const [socket] = useState(() => {
//     console.log('running one time');
//     return io(':5000')
//   });
//   const [messages, setMessages] = useState([]);
  

//   useEffect(() => {
//     console.log("is this running?")
//     socket.on('welcome',data=>{
//       console.log(data)
//     });
//     socket.on("new_message_from_server", msg=>
//       setMessages(prevMessages => {
//         return [msg, ...prevMessages]
//       })
//     )



// //very important in deep nested components
//     return () => socket.disconnect(true);  //clean up
//   }, [socket])
  return (
    <div className="App">
      <h1>Covid-19 Status (Updated every 15 minutes.)</h1>

      <Link to='/world'>World</Link>{'  '}<Link to='/world/USA'>USA(Take longer time,please wait)</Link>{'  '}<Link to='/world/China'>China</Link>{'  '}<Link to='/world/France'>France</Link>{'  '}<Link to='/world/Italy'>Italy</Link>{'  '}<Link to='/world/Spain'>Spain</Link>{'  '}<Link to='/world/Germany'>Germany</Link>
      <SearchForm/> {' '}<Link to ='/register'>Registration</Link>{' '}<Link to ='/login'>Login</Link>{' '}<LogoutButton/>
      {/* <Button color="primary">Hello World</Button> */}
      <Router>
        <Registration path='/register'/>
        <LoginForm path='/login'/>
        <CountryList path='/world'/>
        <CountryDetail path='/world/:searchCountry'/>
      </Router>
      <BrowserRouter>
        <Route path='/join' exact component={Join} />
        <Route path='/chat' component={Chat} />
      </BrowserRouter>
    </div>
  );
}

export default App;
