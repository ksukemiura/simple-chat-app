const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  socket.on('chat message', (msg) => {
    console.log('Received message:', msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});