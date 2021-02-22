import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('product not found,return 404', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/products/${id}`).send().expect(404);
});
it('returns product', async () => {

 await request(app)
    .post('/api/products/default')
    .set('Cookie', global.signinAdmin())
    .send()
    .expect(201);
    const  response=await request(app)
    .get('/api/products')
    .send()
    .expect(200)

  const productResponse = await request(app)
    .get(`/api/products/${(response.body)[0].id}`)
    .send()
    .expect(200);

  expect(productResponse.body.category).toEqual('Shoes');
  expect(productResponse.body.price).toEqual(60.99);
});
