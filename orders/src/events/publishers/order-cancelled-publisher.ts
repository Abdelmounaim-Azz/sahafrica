import { Subjects, Publisher, OrderCancelledEvent } from 'azz-sahafrica';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
