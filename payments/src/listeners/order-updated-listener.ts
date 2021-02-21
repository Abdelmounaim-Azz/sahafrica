import {Listener,Subjects,OrderUpdatedEvent,OrderStatus} from 'azz-sahafrica';
import {Message} from 'node-nats-streaming';
import {queueGroupName} from './queue-group-name';
import {Order} from '../models/order';

export class OrderUpdatedListener extends Listener<OrderUpdatedEvent>{
  subject:Subjects.OrderUpdated=Subjects.OrderUpdated;
  queueGroupName=queueGroupName;
  async onMessage(data:OrderUpdatedEvent['data'],msg:Message){
    const order= await Order.findByEvent(data);
    if(!order){
      throw new Error('Order not found');
    }
    order.set({status:OrderStatus.Updated});
    order.set({version:data.version});
    order.set({isDelivered:data.isDelivered}); 
    order.set({deliveredAt:data.deliveredAt}); 
    await order.save();
    msg.ack();
  }
}