// question-service.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import statRouter from './stat-router.js';

const app = express();
const port = 8004;

app.use(
  cors({
    origin: 'http://localhost:8000', // Dirección del gateway.
    credentials: true, // Permite enviar cookies.
  })
);
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/statdb';
mongoose.connect(mongoUri);

app.use('/', statRouter);

const server = app.listen(port, () => {
  console.log(`Stat Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
  // Close the Mongoose connection
  mongoose.connection.close();
});

export default server;
