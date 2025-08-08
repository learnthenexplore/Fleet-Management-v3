import { Server } from 'socket.io';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`📡 New client connected: ${socket.id}`);

    // Join rooms (e.g., userId, vehicleId, etc.)
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`🧩 Socket ${socket.id} joined room ${roomId}`);
    });

    // Listen for messages and broadcast
    socket.on('chatMessage', (data) => {
      io.to(data.roomId).emit('chatMessage', data);
    });

    // Live location
    socket.on('locationUpdate', (locationData) => {
      io.emit('locationUpdate', locationData);
    });

    // Notifications
    socket.on('notify', (notification) => {
      io.emit('notification', notification); // Or use roomId
    });

    socket.on('disconnect', () => {
      console.log(`❌ Socket disconnected: ${socket.id}`);
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized!');
  return io;
};
