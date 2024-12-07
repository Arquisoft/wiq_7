import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { jest } from '@jest/globals'; // Importa jest desde @jest/globals

// Sobrescribe `authenticateUser` antes de importar el servicio
jest.unstable_mockModule('./middleware/auth-middleware', () => ({
  authenticateUser: jest.fn((req, res, next) => {
    req.user = { userId: '507f1f77bcf86cd799439011', role: 'user' };
    next();
  }),
}));

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_STAT = mongoUri;
  app = (await import('./stat-service.js')).default; // Import app dynamically to ensure MONGODB_URI is set
});

afterAll(async () => {
  app.close();
  await mongoServer.stop();
});

describe('Stat Service', () => {
  it('should add a new stat on POST /addstat', async () => {
    const newStat = {
      gameId: 'testGameId',
      questionId: 'testQuestionId',
      right: false,
      time: 10,
      points: 0,
    };

    const response = await request(app).post('/addstat').send(newStat);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('userId', '507f1f77bcf86cd799439011');
  });
});
