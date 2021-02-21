import { Listener, OrderCancelledEvent, Subjects } from 'azz-sahafrica';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Product } from '../../models/product';


export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const product = await Product.findById(data.product.id);

    if (!product) {
      throw new Error('Product not found');
    }

    product.set({ orderId: undefined });
    await product.save();


    msg.ack();
  }
}
