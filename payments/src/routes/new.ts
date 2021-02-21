import express,{Request,Response} from 'express';
import {body} from 'express-validator';
import{
  requireAuth,
  OrderStatus,
  validateRequest,
  BadRequestError,
  NotAuthorizedError,
  NotFoundError
} from 'azz-sahafrica';

import {stripe} from '../stripe';
import {Order} from '../models/order';
import {Payment} from '../models/payments';
import {natsWrapper} from '../nats-wrapper';
import {PaymentCreatedPublisher} from '../publishers/payment-created-publisher';

const router=express.Router();


router.post('/api/payments/:orderId',
  requireAuth,
  [
    body('token')
      .not()
      .isEmpty(),
  ],
  validateRequest,
  async (req:Request,res:Response)=>{
    const {token }= req.body;
    const orderId=req.params.orderId;
    const order=await Order.findById(orderId);
    if(!order){
      throw new NotFoundError();
    }
    if(order.userId !== req.currentUser!.id){
      throw new NotAuthorizedError();
    }
    if(order.status===OrderStatus.Cancelled){
      throw new BadRequestError('Your order has been cancelled!Try later.','orderCancelled')
    }
    const charge= await stripe.charges.create({
      currency:'usd',
      amount:order.price * 100,
      source:token,
    });
    const payment=Payment.build({
      orderId:orderId,
      stripeId: charge.id
    });
    await payment.save();
    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id:payment.id!,
      orderId:payment.orderId,
      stripeId: payment.stripeId
    })

    res.status(201).send({ message: 'Order Paid',payment});

  });

export {router as createChargeRouter};

