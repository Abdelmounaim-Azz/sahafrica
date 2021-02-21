import { Message } from 'node-nats-streaming';
import { Subjects, Listener, ProductCreatedEvent } from 'azz-sahafrica';
import { Product } from '../../models/product';
import { queueGroupName } from './queue-group-name';

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductCreatedEvent['data'], msg: Message) {
    const { id, name, price,image,description} = data;

    const product = Product.build({
      id,
      name,
      price,
      image,
      description
    });
    await product.save();

    msg.ack();
  }
}
