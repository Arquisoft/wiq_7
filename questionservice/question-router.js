import express from 'express';
import {
  addQuestionsController,
  getGameQuestionsController,
  getQuestionsController,
} from './question-controller.js';
import {
  authenticateUser,
  authorizePermissions,
} from './middleware/auth-middleware.js';

const questionRouter = express.Router();

// Define la ruta para el login y asocia el controlador
questionRouter.post(
  '/addquestion',
  authenticateUser,
  authorizePermissions('admin'),
  addQuestionsController
);
questionRouter.get(
  '/game-questions',
  authenticateUser,
  getGameQuestionsController
);
questionRouter.get('/questions', getQuestionsController);

export default questionRouter;
