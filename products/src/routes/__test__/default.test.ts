import request from 'supertest';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';

it('unAuthorized user,route available only for admins', async () => {
  await request(app)
    .post("/api/products/default")
    .set('Cookie', global.signinnotAdmin())
    .send()
    .expect(401);
});
it('expect 201 products created  ', async () => {
  await request(app)
    .post("/api/products/default")
    .set('Cookie', global.signinAdmin())
    .send()
    .expect(201);
});

it('can only be accessed if the admin is signed in', async () => {
  await request(app).post('/api/products/default').send({}).expect(401);
});

it('publishes events', async () => {
  await request(app)
    .post('/api/products/default')
    .set('Cookie', global.signinAdmin())
    .send()
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
