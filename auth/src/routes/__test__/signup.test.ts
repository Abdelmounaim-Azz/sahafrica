import request from "supertest";
import {app} from "../../app";

it('returns a 400 with a common password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      name:"test123",
      email: 'test@test.com',
      password: 'password1'
    })
    .expect(400);
});
it('returns a 400 with invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      name:"test123",
      email: 'dddss',
      password: 'hahaLL23'
    })
    .expect(400);
});
it('returns a 400 with invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      name:"test123",
      email: 'dddss@test.com',
      password: 'haha'//min 8 1 lowercase and one letter
    })
    .expect(400);
});
it('returns a 400 with invalid name', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      name:"te",//min 3 chars
      email: 'dddss@test.com',
      password: 'haha12Kqa'
    })
    .expect(400);
});
it('returns a 400 with missing email and password and name', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com'
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'alskjdf23'
    })
    .expect(400);
  await request(app)
    .post('/api/users/signup')
    .send({
      name: 'alskjdf'
    })
    .expect(400);
});


it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      name:"test123",
      email: 'test@test.com',
      password: 'test@@123'
    })
    .expect(201);
});
it('forbid duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      name:"khalid1",
      email: 'test@test.com',
      password: 'haha78LL'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      name:"test2",
      email: 'test@test.com',
      password: 'password4443'
    })
    .expect(400);
 
});
it('forbid duplicate usernames', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      name:"samename",
      email: 'test123@test.com',
      password: 'haha78eeAA'
    })
    .expect(201);
  await request(app)
    .post('/api/users/signup')
    .send({
      name:"samename",
      email: 'test321@test.com',
      password: 'hahaJJ78'
    })
    .expect(400);
 
});
it('set cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      name:"test69",
      email: 'test@test.com',
      password: '8charspass'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});