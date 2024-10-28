const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./auth-router.js');

const app = express();
const port = 8002;

// Middleware to parse JSON in request body
app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
mongoose.connect(mongoUri);

// Route for user login
app.use('/', authRouter);

// Start the server
const server = app.listen(port, () => {
  console.log(`Auth Service listening at http://localhost:${port}`);
});

server.on('close', () => {
  // Close the Mongoose connection
  mongoose.connection.close();
});

module.exports = server;
