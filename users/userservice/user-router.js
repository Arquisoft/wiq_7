// userRouter.js
import express from 'express';
import {
  addUserController,
  getUsersController,
  getCurrentUserController,
  updateUserController,
} from './user-controller.js';
import { authenticateUser } from './middleware/auth-middleware.js';

const userRouter = express.Router();

// Define la ruta para el login y asocia el controlador
userRouter.post('/adduser', addUserController);
userRouter.get('/users', getUsersController);
userRouter.get('/current-user', authenticateUser, getCurrentUserController);
userRouter.patch('/update-user', authenticateUser, updateUserController);

export default userRouter;
