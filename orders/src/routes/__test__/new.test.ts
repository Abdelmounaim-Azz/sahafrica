import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Product } from '../../models/product';
import { natsWrapper } from '../../nats-wrapper';

it('404 product not found', async () => {
  const productId = mongoose.Types.ObjectId();

  await request(app)
    .post(`/api/orders/${productId}`)
    .set('Cookie', global.signinnotAdmin())
    .send()
    .expect(404);
});


it('order a product', async () => {
  const product = Product.build({
    id: mongoose.Types.ObjectId().toHexString(),
    name: 'product',
    price: 20,
    image:'/img/shoe1.jpg',
    description:"product",
  });
  await product.save();

  await request(app)
    .post(`/api/orders/${product.id}`)
    .set('Cookie', global.signinnotAdmin())
    .send()
    .expect(201);
});

it('orderCreated event', async () => {
  const product = Product.build({
    id: mongoose.Types.ObjectId().toHexString(),
    name: 'product',
    price: 20,
    image:'/img/shoe1.jpg',
    description:"product",
  });
  await product.save();

  await request(app)
    .post(`/api/orders/${product.id}`)
    .set('Cookie', global.signinnotAdmin())
    .send()
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
