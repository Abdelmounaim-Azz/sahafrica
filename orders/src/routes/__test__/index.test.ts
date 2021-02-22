import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';

const buildProduct = async () => {
  const product = Product.build({
    id: mongoose.Types.ObjectId().toHexString(),
    name: 'product',
    price: 20,
    image:'/img/shoe1.jpg',
    description:"product",
  
  });
  await product.save();

  return product;
};

it('user fetch orders', async () => {

  const productOne = await buildProduct();
  const productTwo = await buildProduct();
  const productThree = await buildProduct();

  const userOne = global.signinAdmin();
  const userTwo = global.signinnotAdmin();
  
  await request(app)
    .post(`/api/orders/${productOne.id}`)
    .set('Cookie', userOne)
    .send()
    .expect(201);

  
  const orderOne  = await request(app)
    .post(`/api/orders/${productTwo.id}`)
    .set('Cookie', userTwo)
    .send()
    .expect(201);
  const  orderTwo= await request(app)
    .post(`/api/orders/${productThree.id}`)
    .set('Cookie', userTwo)
    .send()
    .expect(201);

  const response = await request(app)
    .get('/api/orders')
    .set('Cookie', userTwo)
    .expect(200);

});
