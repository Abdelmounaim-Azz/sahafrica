import request from 'supertest';
import { app } from '../../app';

it('no user found,expect 400', async () => {


  await request(app)
    .post('/api/users/forgotpassword')
    .send({
      email:"test@test.com"
    })
    .expect(400)
  
});
it('good credentials expect 200', async () => {

  await request(app)
    .post('/api/users/signup')
    .send({
      name:"testuser",
      email: 'test@test.com',
      password: 'test123K'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);

  await request(app)
    .post('/api/users/forgotpassword')
    .send({
      email:"test@test.com"
    })
    .expect(200)
  
});
it('wrong email expect 400', async () => {

  await request(app)
    .post('/api/users/signup')
    .send({
      name:"testuser",
      email: 'test@test.com',
      password: 'test123K'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);

  await request(app)
    .post('/api/users/forgotpassword')
    .send({
      email:"tes123t@test.com"
    })
    .expect(400)
  
});
