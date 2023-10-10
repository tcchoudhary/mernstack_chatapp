//require express and initialise express for connecting the server
require('dotenv').config();
const mongoose = require('mongoose')
const userRoutes = require('./routes/UserRoute');
const messageRoute = require('./routes/MessageRoute');
const chatRoutes = require('./routes/ChatRoute');
const path= require("path");
const express = require('express');
const db = require('./config/databash');
const app = express();
var cors = require('cors')
//connect the databash

mongoose.connect("mongodb://127.0.0.1:27017/ggpl").then(()=>{
  console.log(`connected to database`);
})

app.use(cors({
     origin: '*'
 }));



app.use(express.json()); // to accept json data

//static file
app.use(express.static(path.join(__dirname,'./front-end/build')))



//set the port number absolute and static
const port = process.env.PORT || 7000

//set the api route
app.use("/", userRoutes);
app.use('/chat',chatRoutes);
app.use('/message',messageRoute)


// --------------------------deployment------------------------------
  app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname,'./front-end/build/index.html'))
  });
// --------------------------deployment------------------------------


const Server = app.listen(port,()=>{
     console.log(`server is running at ${port}`)
});


const io = require("socket.io")(Server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});





// server-side
io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });
  

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved?.chat;
    if (!chat?.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved?.sender?._id) return;
      socket.in(user?._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

