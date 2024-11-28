import express from 'express';
import { addStatController, getStatsController } from './stat-controller.js';
import { authenticateUser } from './middleware/auth-middleware.js';

const statRouter = express.Router();

// Define la ruta y asocia el controlador
statRouter.post('/addstat', authenticateUser, addStatController);
statRouter.get('/stats', getStatsController);

export default statRouter;