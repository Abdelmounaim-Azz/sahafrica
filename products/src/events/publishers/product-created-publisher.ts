import { Publisher, Subjects, ProductCreatedEvent } from 'azz-sahafrica';

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
}
