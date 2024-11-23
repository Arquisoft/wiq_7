import express from 'express';
import { addStatController, getStatsController } from './stat-controller.js';

const statRouter = express.Router();

// Define la ruta y asocia el controlador
statRouter.post('/addstat', addStatController);
statRouter.get('/stats', getStatsController);

export default statRouter;
