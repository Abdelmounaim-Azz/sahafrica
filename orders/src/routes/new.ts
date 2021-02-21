
import { body } from 'express-validator';

import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  OrderStatus,
  validateRequest
} from 'azz-sahafrica';
import { Product } from '../models/product';
import { Order } from '../models/order';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

const EXPIRATION_SECONDS = 5 * 60;

router.post(
  '/api/orders/:productId',
  requireAuth,
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.productId);
    
    if (!product) {
      throw new NotFoundError();
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_SECONDS);

   
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      product,
      isDelivered:false,
      paidAt:new Date(),
    });
  
    await order.save();
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id, 
      version:order.version,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      product: {
        id: product.id,
        price: product.price,
        description:product.description,
        image:product.image,
        name:product.name
      },
      isDelivered:order.isDelivered,
      paidAt:order.paidAt
    });  
    
    
    res.status(201).send({ message: 'New Order Created', order});
  }
);

export { router as newOrderRouter };
