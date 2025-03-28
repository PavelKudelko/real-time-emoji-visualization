import { Server } from 'socket.io';

export function setupWebSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: [ '*' ,
           "http://server_a:3000",
           "http://localhost:3000",
          // "http://localhost:5173",
           "http://localhost:8080"],

      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
}

