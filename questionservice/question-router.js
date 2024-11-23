import express from 'express';
import {
  addQuestionsController,
  getQuestionsController,
  getGameQuestionsController,
} from './question-controller.js';

const questionRouter = express.Router();

// Define la ruta para el login y asocia el controlador
questionRouter.post('/addquestion', addQuestionsController);
questionRouter.get('/questions', getQuestionsController);
questionRouter.get('/game-questions', getGameQuestionsController);

export default questionRouter;
