import request from 'supertest';
import { app } from '../../app';



it('fetch and show empty products', async () => {
  const  { body:length }=await request(app)
    .get('/api/products')
    .set('Cookie', global.signinnotAdmin())
    .send()
    .expect(200)

  expect(length).toEqual([])
});

