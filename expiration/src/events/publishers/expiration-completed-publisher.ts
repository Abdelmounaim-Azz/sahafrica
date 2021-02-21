import {
  Subjects,
  Publisher,
  ExpirationCompletedEvent,
} from 'azz-sahafrica';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompletedEvent
> {
  subject: Subjects.ExpirationCompleted = Subjects.ExpirationCompleted;
}
