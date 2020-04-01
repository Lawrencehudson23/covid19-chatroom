const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const socketio = require('socket.io');
const http = require('http');

const {addUser, removeUser,getUser, getUserInRoom} = require('./users');

require('dotenv').config({path:__dirname + '/../.env'});


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}))

require('./config/mongoose.config');

const userRoutes = require('./routes/user.routes');
const router = require('./router');

userRoutes(app);
const server = http.createServer(app);
const io = socketio(server);

app.use(router);


let connectedClients = 0;

io.on('connection',(socket)=>{
    // console.log(socket.id);
    connectedClients++;
    socket.on('join', ({name,room}) => {
        console.log(name, room);
        const {error,user} = addUser({id:socket.id,name,room});
        
        if(error) return console.log(error);
        
        socket.join(user.room);

        socket.emit('message', {user:'admin', text:`${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user:'admin',text:`${user.name} has joined!`})
    })
    
    socket.on('sendMessage',(message)=> {
        console.log(message)
        const user = getUser(socket.id);
        
        io.to(user.room).emit('message', {user: user.name, text:message});
        
        
        
    })
    
    
    console.log('We have '+connectedClients +' connected!');
    // socket.broadcast.emit('new user joined!')
    
    // socket.emit('welcome',{
        
    // })
    
    socket.on('disconnect',()=>{
        connectedClients--;
        console.log('Somebody left:(We now have '+ connectedClients + ' connected!')  
        
    })
})

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));

