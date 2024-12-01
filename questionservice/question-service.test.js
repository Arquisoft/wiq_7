import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = (await import('./question-service.js')).default; // Import app dynamically to ensure MONGODB_URI is set
});

afterAll(async () => {
  app.close();
  await mongoServer.stop();
});

describe('Question Service', () => {
  it('should add a new question on POST /addquestion', async () => {
    const newQuestion = {
      type: 'testType',
      name: 'testName',
      path: 'testPath',
      right: 'testRight',
      wrong1: 'testWrong1',
      wrong2: 'testWrong2',
      wrong3: 'testWrong3',
    };

    const response = await request(app).post('/addquestion').send(newQuestion);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('type', 'testType');
  });
});
