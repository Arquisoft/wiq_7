// authRouter.js
const express = require('express');
const { loginController } = require('./auth-controller.js'); // Asegúrate de que esta ruta sea correcta

const authRouter = express.Router();

// Define la ruta para el login y asocia el controlador
authRouter.post('/login', loginController);

module.exports = authRouter;
