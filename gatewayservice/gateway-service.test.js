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
  } else if (url.href.endsWith('/addquestion')) {
    return Promise.resolve({ data: { msg: 'question added successfully' } });
  }
});

axios.get = jest.fn((url) => {
  if (url.href.endsWith('/logout')) {
    return Promise.resolve({ data: { msg: 'user logged out' } });
  } else if (
    url.href.endsWith('/users') ||
    url.href.endsWith('/current-user')
  ) {
    return Promise.resolve({
      data: {
        username: 'test',
        role: 'admin',
      },
    });
  }
});

axios.patch = jest.fn((url) => {
  if (url.href.endsWith('/update-user')) {
    return Promise.resolve({
      data: {
        username: 'test',
        role: 'admin',
      },
    });
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

  // Test /logout endpoint
  it('should forward logout request to auth service', async () => {
    const response = await request(app).get('/logout');
    expect(response.statusCode).toBe(200);
    expect(response.body.msg).toBe('user logged out');
  });

  // Test /adduser endpoint
  it('should forward add user request to user service', async () => {
    const response = await request(app)
      .post('/adduser')
      .send({ username: 'newuser', password: 'newpassword' });
    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe('mockedUserId');
  });

  // Test /users endpoint
  it('should forward users request to user service', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    console.log(response.body);
    expect(response.body.username).toBe('test');
  });

  // Test /current-user endpoint
  it('should forward current-user request to user service', async () => {
    const response = await request(app).get('/current-user');
    expect(response.statusCode).toBe(200);
    console.log(response.body);
    expect(response.body.username).toBe('test');
  });

  it('should forward update-user request to user service', async () => {
    const response = await request(app).patch('/update-user');
    expect(response.statusCode).toBe(200);
    console.log(response.body);
    expect(response.body.username).toBe('test');
  });

  // Test /addquestion endpoint
  it('should forward add user request to question service', async () => {
    const response = await request(app).post('/addquestion').send({
      type: 'testType',
      path: 'testPath',
      right: 'testRight',
      wrong1: 'testWrong1',
      wrong2: 'testWrong2',
      wrong3: 'testWrong3',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.msg).toBe('question added successfully');
  });
});
