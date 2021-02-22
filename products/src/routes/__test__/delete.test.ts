import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

it('unAuthorized user,route available only for admins', async () => {
  await request(app)
    .post('/api/products/default')
    .set('Cookie', global.signinAdmin())
    .send()
    .expect(201);
    const  response=await request(app)
    .get('/api/products')
    .send()
    .expect(200)
  await request(app)
    .delete(`/api/products/${(response.body)[0].id}`)
    .set('Cookie', global.signinnotAdmin())
    .send()
    .expect(401);
});
it('expect 401 unauthorize to delete product ', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
await request(app)
  .delete(`/api/products/${id}`)
  .set('Cookie', global.signinAdmin())
  .send()
  .expect(404);
});
// it('expect 204 product deleted', async () => {
//   await request(app)
//   .post('/api/products/default')
//   .set('Cookie', global.signinAdmin())
//   .send()
//   .expect(201);
//   const  response=await request(app)
//   .get('/api/products')
//   .send()
//   .expect(200)
// await request(app)
//   .delete(`/api/products/${(response.body)[0].id}`)
//   .send()
//   .expect(204);
// });
// it('emit productDeleted event', async () => {
//   await request(app)
//   .post('/api/products/default')
//   .set('Cookie', global.signinAdmin())
//   .send()
//   .expect(201);
//   const  response=await request(app)
//   .get('/api/products')
//   .send()
//   .expect(200)
// await request(app)
//   .delete(`/api/products/${(response.body)[0].id}`)
//   .send()
//   .expect(204);
// expect(natsWrapper.client.publish).toHaveBeenCalled();
// });

