import request from 'supertest';
import { app } from '../../app';

it('fails unsigned user', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      name:"notsigned",
      email: 'test@test.com',
      password: 'notsigned12'
    })
    .expect(400);
});

it('fails incorrect password ', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      name:"test123",
      email: 'test@test.com',
      password: 'haha89Kss'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'haha89sshagas'
    })
    .expect(400);
});
it('fails wrong email ', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      name:"test123",
      email: 'test@test.com',
      password: 'haha89Kss'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'wrong@test.com',
      password: 'haha89Kss'
    })
    .expect(400);
});

it('responds with a cookie with valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      name:"test123",
      email: 'test@test.com',
      password: 'haha89Kss'
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'haha89Kss'
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
