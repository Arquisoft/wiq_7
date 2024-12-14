import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { jest } from '@jest/globals';

// Sobrescribe `authenticateUser` antes de importar el servicio
jest.unstable_mockModule('./middleware/auth-middleware', () => ({
  authenticateUser: jest.fn((req, res, next) => {
    req.user = { userId: '507f1f77bcf86cd799439010', role: 'user' };
    next();
  }),
}));

// Sobrescribe `validateRegisterInput` antes de importar el servicio
jest.unstable_mockModule('./middleware/validation-middleware', () => ({
  validateRegisterInput: jest.fn((req, res, next) => {
    next();
  }),
  validateUpdateUserInput: jest.fn((req, res, next) => {
    next();
  }),
}));

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_USER = mongoUri;
  app = (await import('./user-service.js')).default; // Import app dynamically to ensure MONGODB_URI is set
});

afterAll(async () => {
  app.close();
  await mongoServer.stop();
});

describe('User Service', () => {
  it('should add a new user on POST /adduser', async () => {
    const newUser = {
      username: 'testuser',
      password: 'testpassword',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'testuser');
  });
});
