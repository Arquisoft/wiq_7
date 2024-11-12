// auth-router.js
const express = require('express');
const { loginController } = require('./auth-controller');

const authRouter = express.Router();

// Define la ruta para el login y asocia el controlador
authRouter.post('/login', loginController);

module.exports = authRouter;
