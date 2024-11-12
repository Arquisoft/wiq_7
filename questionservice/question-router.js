const express = require('express');
const {
  addQuestionsController,
  getQuestionsController,
  getGameQuestionsController,
} = require('./question-controller');

const questionRouter = express.Router();

// Define la ruta para el login y asocia el controlador
questionRouter.post('/addquestion', addQuestionsController);
questionRouter.get('/questions', getQuestionsController);
questionRouter.get('/game-questions', getGameQuestionsController);

module.exports = questionRouter;
