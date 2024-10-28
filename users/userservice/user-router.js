// userRouter.js
const express = require('express');
const {
  addUserController,
  getUsersController,
} = require('./user-controller.js');

const userRouter = express.Router();

// Define la ruta para el login y asocia el controlador
userRouter.post('/adduser', addUserController);
userRouter.get('/users', getUsersController);

module.exports = userRouter;
