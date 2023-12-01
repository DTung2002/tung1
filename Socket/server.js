const express = require('express');
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");
const { join } = require('path');
const server = require('http').createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
app.get('/', (req, res) => {
  res.sendFile((__dirname + '/public/index.html'));
});

io.on("connection", (socket) => {
  // const roomName = `room_${socket.id}`;
  
  console.log('new connect from ' +socket.id);
  socket.on('chat room', (data)=>{
    socket.join(data);
    socket.Phong = data;
    // socket.emit('room', data);
  })
  socket.on('chat message', (msg)=>{
    socket.emit('chat meessage', 'Chào mừng bạn đến với phòng chat ' +socket.Phong);

    io.sockets.to(socket.Phong).emit('chat message', msg)  
  });
  socket.on('disconnect', () =>{
    console.log('user disconnected')
  })
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});