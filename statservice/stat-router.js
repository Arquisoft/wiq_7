const express = require('express');
const { addStatController, getStatsController } = require('./stat-controller');

const statRouter = express.Router();

// Define la ruta y asocia el controlador
statRouter.post('/addstat', addStatController);
statRouter.get('/stats', getStatsController);

module.exports = statRouter;
