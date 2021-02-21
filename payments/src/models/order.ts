import mongoose from 'mongoose';
import {updateIfCurrentPlugin} from 'mongoose-update-if-current';
import {OrderStatus} from 'azz-sahafrica';

//Properties we shoud have when building an order
interface OrderAttrs{
  id:string;
  version:number;
  userId:string;
  price:number;
  status:OrderStatus;
  paidAt:Date;
  isDelivered?:boolean,
  deliveredAt?:Date
}

//List of propertie that an order has
interface OrderDoc extends mongoose.Document{
  version:number;
  userId:string;
  price:number;
  status:OrderStatus;
  paidAt:Date;
  isDelivered:boolean,
  deliveredAt:Date
}

//List of properties that the model itself contains
interface OrderModel extends mongoose.Model<OrderDoc>{
  //Takes in properties of type Orderattrs and return  a doc of type OrderDoc
  build(attrs:OrderAttrs):OrderDoc;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<OrderDoc | null>;
}

const orderSchema=new mongoose.Schema({
  userId:{
    type: String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  status:{
    type:String,
    required:true,
  },
 paidAt: { type: Date },
 isDelivered: { type: Boolean, default: false },
 deliveredAt: { type: Date },
},{
  toJSON:{
    transform(doc,ret){
      ret.id=ret._id;
      delete ret._id
    }
  }
});
//Override Mongoose __v flag
orderSchema.set('versionKey','version');
orderSchema.plugin(updateIfCurrentPlugin);
orderSchema.statics.build =(attrs:OrderAttrs)=>{
  return new Order({
    _id:attrs.id,
    version:attrs.version,
    price:attrs.price,
    userId:attrs.userId,
    status:attrs.status,
    paidAt:attrs.paidAt,
    isDelivered:attrs.isDelivered
  });
};
orderSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Order.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

const Order=mongoose.model<OrderDoc,OrderModel>('Order',orderSchema);

export {Order};