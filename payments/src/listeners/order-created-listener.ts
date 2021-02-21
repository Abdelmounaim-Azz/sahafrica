import {Listener,OrderCreatedEvent,Subjects} from 'azz-sahafrica';
import {Message} from 'node-nats-streaming'
import {queueGroupName} from './queue-group-name';
import {Order } from '../models/order';
export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
  subject:Subjects.OrderCreated=Subjects.OrderCreated;
  queueGroupName=queueGroupName;
  async onMessage(data:OrderCreatedEvent['data'],msg:Message){
    const order= Order.build({
      id:data.id,
      price:data.product.price,
      status:data.status,
      userId:data.userId,
      version:data.version,
      paidAt:data.paidAt,
      isDelivered:data.isDelivered
    })
    await order.save();
    msg.ack();
  }
}