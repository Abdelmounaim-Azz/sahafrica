import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';
import { natsWrapper } from '../../nats-wrapper';
it('fetch order', async () => {
  const product = Product.build({
    id: mongoose.Types.ObjectId().toHexString(),
    name: 'product',
    price: 20,
    image:'/img/shoe1.jpg',
    description:"product",
  });
  await product.save();
  const user = global.signinAdmin();
  const { body: order } = await request(app)
    .post(`/api/orders/${product.id}`)
    .set('Cookie', user)
    .send()
    .expect(201);
    const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    expect(fetchedOrder.id).toEqual(order.id);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
