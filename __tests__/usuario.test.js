const request = require('supertest');
const app = require('../app');

describe('GET /users', () => {
  test('It should respond with the array of users', async () => {
    const response = await request(app).get('/api/users');
    console.log('response', response);
    expect(response.statusCode).toBe(200);
  });
});
