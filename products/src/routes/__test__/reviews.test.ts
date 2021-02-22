import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('expect 404 not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .post(`/api/products/${id}/reviews`)
    .set('Cookie', global.signinnotAdmin())
    .send()
    .expect(404);
});
it('create review ', async () => {
  await request(app)
  .post('/api/products/default')
  .set('Cookie', global.signinAdmin())
  .send()
  .expect(201);
  const  response=await request(app)
  .get('/api/products')
  .set('Cookie', global.signinnotAdmin())
  .send()
  .expect(200)
  await request(app)
  .post(`/api/products/${(response.body)[0].id}/reviews`)
  .set('Cookie', global.signinnotAdmin())
  .send({
    title: 'Review',
    text: 'Review',
    rating:5,
  })
  .expect(201)
});
it('Bad request from user invalid inputs ', async () => {
  await request(app)
  .post('/api/products/default')
  .set('Cookie', global.signinAdmin())
  .send()
  .expect(201);
  const  response=await request(app)
  .get('/api/products')
  .set('Cookie', global.signinnotAdmin())
  .send()
  .expect(200)
  await request(app)
  .post(`/api/products/${(response.body)[0].id}/reviews`)
  .set('Cookie', global.signinnotAdmin())
  .send({
    title: '',
    text: '',
    rating:-5,
  })
  .expect(400)
});
