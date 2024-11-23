// auth-router.js
import express from 'express';
import { loginController } from './auth-controller.js';

const authRouter = express.Router();

// Define la ruta para el login y asocia el controlador
authRouter.post('/login', loginController);

export default authRouter;
