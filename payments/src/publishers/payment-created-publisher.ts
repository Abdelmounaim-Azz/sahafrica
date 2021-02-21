import {Subjects,Publisher,PaymentCreatedEvent} from 'azz-sahafrica';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
  subject:Subjects.PaymentCreated=Subjects.PaymentCreated;
  
}