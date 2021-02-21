import { Publisher, OrderCreatedEvent, Subjects } from 'azz-sahafrica';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
