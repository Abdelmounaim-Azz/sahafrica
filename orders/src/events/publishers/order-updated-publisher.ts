import { Subjects, Publisher, OrderUpdatedEvent } from 'azz-sahafrica';

export class OrderUpdatedPublisher extends Publisher<OrderUpdatedEvent> {
  subject: Subjects.OrderUpdated = Subjects.OrderUpdated;
}
