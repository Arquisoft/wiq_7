// userRouter.js
import express from 'express';
import { addUserController, getUsersController } from './user-controller.js';

const userRouter = express.Router();

// Define la ruta para el login y asocia el controlador
userRouter.post('/adduser', addUserController);
userRouter.get('/users', getUsersController);

export default userRouter;
