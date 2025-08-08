// index.js
import http from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';
// import { initSocket } from './socket.js';
import connectDB from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);



















// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDB(); // ⬅️ Await inside async function

    // Initialize socket only after DB is connected
    // initSocket(server);

    server.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); // ⬅️ Start everything
