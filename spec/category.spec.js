const supertest = require('supertest');
const app = require('../index');
const request = supertest(app);

describe('Test category Rout', () => {
  it('test get route', async () => {
    const res = await request.get('/category');
    console.log(res);
    expect(res.status).toBe(200);
  });
});
