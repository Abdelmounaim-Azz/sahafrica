import { Message } from 'node-nats-streaming';
import { Subjects, Listener, ProductUpdatedEvent } from 'azz-sahafrica';
import { Product } from '../../models/product';
import { queueGroupName } from './queue-group-name';

export class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
  subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductUpdatedEvent['data'], msg: Message) {
    const product = await Product.findById(data.id);

    if (!product) {
      throw new Error('Product not found');
    }

    const {  name, price,image,description} = data;
    product.set({  name, price,image,description});
    await product.save();

    msg.ack();
  }
}
