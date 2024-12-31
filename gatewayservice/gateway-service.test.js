import request from 'supertest';
import axios from 'axios';
import { jest } from '@jest/globals'; // Importa jest desde @jest/globals

jest.mock('axios');

process.env.AUTH_SERVICE_URL = 'http://authservice';
process.env.USER_SERVICE_URL = 'http://userservice';
process.env.QUESTION_SERVICE_URL = 'http://questionservice';
process.env.STAT_SERVICE_URL = 'http://statservice';

// Crea el mock manualmente para asegurar que `post` es una función mock
axios.post = jest.fn((url, data) => {
  if (url.href.endsWith('/login')) {
    return Promise.resolve({ data: { token: 'mockedToken' } });
  } else if (url.href.endsWith('/adduser')) {
    return Promise.resolve({ data: { userId: 'mockedUserId' } });
  }
});

let app = (await import('./gateway-service.js')).default;

afterAll(async () => {
  app.close();
});

describe('Gateway Service', () => {
  // Test /login endpoint
  it('should forward login request to auth service', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBe('mockedToken');
  });

  // Test /adduser endpoint
  it('should forward add user request to user service', async () => {
    const response = await request(app)
      .post('/adduser')
      .send({ username: 'newuser', password: 'newpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe('mockedUserId');
  });
});
