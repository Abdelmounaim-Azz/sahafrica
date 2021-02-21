import { Message } from 'node-nats-streaming';
import { Subjects, Listener, ProductDeletedEvent } from 'azz-sahafrica';
import { Product } from '../../models/product';
import { queueGroupName } from './queue-group-name';

export class ProductDeletedListener extends Listener<ProductDeletedEvent> {
  subject: Subjects.ProductDeleted = Subjects.ProductDeleted;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductDeletedEvent['data'], msg: Message) {
    const product = await Product.findById(data.id);

    if (!product) {
      throw new Error('Product not found');
    }

    await product.remove();

    msg.ack();
  }
}
