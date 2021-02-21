import {
  Listener,
  Subjects,
  ExpirationCompletedEvent,
  OrderStatus,
} from 'azz-sahafrica';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';
import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher';


export class ExpirationCompletedListener extends Listener<
  ExpirationCompletedEvent
> {
  queueGroupName = queueGroupName;
  subject: Subjects.ExpirationCompleted = Subjects.ExpirationCompleted;

  async onMessage(data: ExpirationCompletedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId).populate('product');

    if (!order) {
      throw new Error('Order not found');
    }
    if(order.status === OrderStatus.Completed){
      return msg.ack();
    }

    order.set({
      status: OrderStatus.Cancelled,
    });
    await order.save();
    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      product: {
        id: order.product.id,
      },
    });

    msg.ack();
  }
}
