import mongoose from 'mongoose';
import { OrderStatus } from 'azz-sahafrica';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { ProductDoc } from './product';

export { OrderStatus };

interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  product: ProductDoc;
  isDelivered:boolean;
  paidAt:Date;
  deliveredAt?: Date;
}

interface OrderDoc extends mongoose.Document {
  id:string;
  version:number;
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  product: any;
  paidAt:Date;
  isDelivered:boolean;
  deliveredAt?:Date ,
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    }, 
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },

  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
