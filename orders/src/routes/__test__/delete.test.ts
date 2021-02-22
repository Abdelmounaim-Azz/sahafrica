import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';
import { Order, OrderStatus } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';

// it('marks an order as cancelled', async () => {
//   const product = Product.build({
//     id: mongoose.Types.ObjectId().toHexString(),
//     name: 'product',
//     price: 20,
//     image:'/img/shoe1.jpg',
//     description:"product",
  
//   });
//   await product.save();

//   const user = global.signinAdmin();
  
//   const { body: order } = await request(app)
//   .post(`/api/orders/${product.id}`)
//   .set('Cookie', user)
//   .send()
//   .expect(201);

//   await request(app)
//     .delete(`/api/orders/${order.id}`)
//     .send()
//     .expect(204);

//   const updatedOrder = await Order.findById(order.id);

//   expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
// });

it('order cancelled event', async () => {
  const product = Product.build({
    id: mongoose.Types.ObjectId().toHexString(),
    name: 'product',
    price: 20,
    image:'/img/shoe1.jpg',
    description:"product",
   
  });
  await product.save();

  const user = global.signinnotAdmin();
  
  const { body: order } = await request(app)
  .post(`/api/orders/${product.id}`)
  .set('Cookie', user)
  .send()
  .expect(201);

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
