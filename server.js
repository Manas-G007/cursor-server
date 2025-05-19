const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  socket.on('send-cursor', (data) => {
    console.log({ id: socket.id, ...data });
    socket.broadcast.emit('receive-cursor', { id: socket.id, ...data });
  });

  socket.on('disconnect', () => {
    io.emit('user-disconnected', socket.id);
  });
});

server.listen(6969, () => {
  console.log("server is running on port 6969");
});
