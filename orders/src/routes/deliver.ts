import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
  isAdmin
} from 'azz-sahafrica';
import { Order } from '../models/order';
import { OrderUpdatedPublisher } from '../events/publishers/order-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
  '/api/orders/:orderId',
  requireAuth,
  isAdmin,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('product');

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    order.set({isDelivered:true})
    order.set({deliveredAt:new Date()})
    order.set({status:OrderStatus.Updated})
    await order.save();
    new OrderUpdatedPublisher(natsWrapper.client).publish({
      id: order.id, 
      version:order.version,
      status: order.status,
      userId:order.userId,
      product: {
        id: order.product.id,
        price:order.product.price,
        image:order.product.image,
        description:order.product.description,
        name:order.product.name,
      },
      isDelivered:order.isDelivered,
      deliveredAt:order.deliveredAt!
    })
    res.send({ message: 'Order Delivered', order });
  }
);

export { router as deliverOrderRouter };
