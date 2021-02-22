import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Product } from '../../models/product';
import { natsWrapper } from '../../nats-wrapper';

it('unAuthorized user,route available only for admins', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/products/${id}`)
    .set('Cookie', global.signinnotAdmin())
    .send({
      name: 'product',
      price: 60,
      category:'Shoes',
      brand:'Nike',
      countInStock:90,
      description:"test product"
    })
    .expect(401);
});
it('not found return 404', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/products/${id}`)
    .set('Cookie', global.signinAdmin())
    .send({
      name: 'product',
      price: 60,
      category:'Shoes',
      brand:'Nike',
      countInStock:90,
      description:"test product"
    })
    .expect(404);
});

it('can only be accessed if the admin is signed in ', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).put(`/api/products/${id}`).send({}).expect(401);
});

it('returns a 401 if normal user tries to update products ', async () => {
  await request(app)
    .post('/api/products/default')
    .set('Cookie', global.signinAdmin())
    .send();
    const response = await request(app)
    .get('/api/products')
    .set('Cookie', global.signinAdmin())
    .send();
  await request(app)
    .put(`/api/products/${(response.body)[0].id}`)
    .set('Cookie', global.signinnotAdmin())
    .send({
      name: 'testproducts',
      price: 67,
      category:'test',
      brand:"test",
      countInStock:20,
      description:"test test"
    })
    .expect(401);
});
it('returns a 400 if the user provides invalid name ...', async () => {

   await request(app)
    .post('/api/products/default')
    .set('Cookie', global.signinAdmin())
    .send();
    const response = await request(app)
    .get('/api/products')
    .set('Cookie', global.signinAdmin())
    .send();
  await request(app)
    .put(`/api/products/${(response.body)[0].id}`)
    .set('Cookie', global.signinAdmin())
    .send({
      name: '',
      price: 20,
      description:"tetetete",
      category:"hahah",
      brand:'hahaha',
      countInStock:10
    })
    .expect(400);

  await request(app)
    .put(`/api/products/${(response.body)[0].id}`)
    .set('Cookie', global.signinAdmin())
    .send({
      name: 'gggg',
      price: -20,
      description:"tetetete",
      category:"hahah",
      brand:'hahaha',
      countInStock:10
    })
    .expect(400);
  await request(app)
    .put(`/api/products/${(response.body)[0].id}`)
    .set('Cookie', global.signinAdmin())
    .send({
      name: 'gggg',
      price: 20,
      description:"tetetete",
      category:"hahah",
      brand:'hahaha',
      countInStock:-10
    })
    .expect(400);
  await request(app)
    .put(`/api/products/${(response.body)[0].id}`)
    .set('Cookie', global.signinAdmin())
    .send({
      name: 'gggg',
      price: 20,
      description:"",
      category:"hahah",
      brand:'hahaha',
      countInStock:10
    })
    .expect(400);
  await request(app)
    .put(`/api/products/${(response.body)[0].id}`)
    .set('Cookie', global.signinAdmin())
    .send({
      name: 'gggg',
      price: 20,
      description:"",
      category:"",
      brand:'hahaha',
      countInStock:10
    })
    .expect(400);
  await request(app)
    .put(`/api/products/${(response.body)[0].id}`)
    .set('Cookie', global.signinAdmin())
    .send({
      name: 'gggg',
      price: 20,
      description:"",
      category:"hahah",
      brand:'',
      countInStock:10
    })
    .expect(400);
});
// it('updates product valid inputs', async () => {
//   await request(app)
//     .post('/api/products/default')
//     .set('Cookie', global.signinAdmin())
//     .send()
//     .expect(201);

//   const response = await request(app)
//   .get('/api/products')
//   .send()
//   .expect(200)

//   const productResponse = await request(app)
//     .put(`/api/products/${(response.body)[0].id}`)
//     .send({
//       name: 'Product',
//       price: 20,
//       description:"Product",
//       category:"Product",
//       brand:'Product',
//       countInStock:20
//     })
//     .expect(200);


//   expect(productResponse.body.name).toEqual('Product');
//   expect(productResponse.body.description).toEqual('Product');
//   expect(productResponse.body.category).toEqual('Product');
//   expect(productResponse.body.brand).toEqual('Product');
//   expect(productResponse.body.price).toEqual(20);
//   expect(productResponse.body.countInStock).toEqual(20);
// });

// it('publishes an event', async () => {

//   await request(app)
//   .post('/api/products/default')
//   .set('Cookie', global.signinAdmin())
//   .send();
//   const response = await request(app)
//   .get('/api/products')
//   .set('Cookie', global.signinAdmin())
//   .send();


//   await request(app)
//     .put(`/api/products/${(response.body)[0].id}`)
//     .set('Cookie', global.signinAdmin())
//     .send({
//       name: 'Product',
//       price: 20,
//       description:"Product",
//       category:"Product",
//       brand:'Product',
//       countInStock:20
//     })
//     .expect(200);

//   expect(natsWrapper.client.publish).toHaveBeenCalled();
// });


