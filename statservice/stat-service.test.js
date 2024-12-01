import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = (await import('./stat-service.js')).default; // Import app dynamically to ensure MONGODB_URI is set
});

afterAll(async () => {
  app.close();
  await mongoServer.stop();
});

describe('Stat Service', () => {
  it('should add a new stat on POST /addstat', async () => {
    const newStat = {
      userId: '507f1f77bcf86cd799439011',
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
