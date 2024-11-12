// question-service.js
const express = require('express');
const mongoose = require('mongoose');
const questionRouter = require('./question-router');

const app = express();
const port = 8003;

// Middleware to parse JSON in request body
app.use(express.json());

// Connect to MongoDB
const mongoUri =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/questiondb';
mongoose.connect(mongoUri);

app.use('/', questionRouter);

const server = app.listen(port, () => {
  console.log(`Question Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
  // Close the Mongoose connection
  mongoose.connection.close();
});

module.exports = server;
