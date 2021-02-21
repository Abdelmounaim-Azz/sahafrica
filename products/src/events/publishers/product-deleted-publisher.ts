import { Publisher, Subjects, ProductDeletedEvent } from 'azz-sahafrica';

export class ProductDeletedPublisher extends Publisher<ProductDeletedEvent> {
  subject: Subjects.ProductDeleted = Subjects.ProductDeleted;
}
