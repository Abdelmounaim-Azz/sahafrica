import { Publisher, Subjects, ProductUpdatedEvent } from 'azz-sahafrica';

export class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
  subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
}
