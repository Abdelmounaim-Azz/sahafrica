import mongoose from 'mongoose';

import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface ProductAttrs {
  id:string;
  name: string;
  price:number;
  image:string;
  description:string;
}

export interface ProductDoc extends mongoose.Document {
  id:string;
  version:number;
  name: string;
  price:number;
  image:string;
  description:string;
  userId: string;
  orderId?: string;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<ProductDoc | null>;
}

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
productSchema.set('versionKey', 'version');
productSchema.plugin(updateIfCurrentPlugin);

productSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Product.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};


productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(
    {
    _id: attrs.id,
    name: attrs.name,
    price: attrs.price,
    image:attrs.image,
    description:attrs.description,
    }
  );
};


const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema);

export { Product };
