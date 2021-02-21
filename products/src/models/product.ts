import mongoose, { Schema } from 'mongoose';
import slugify from "slugify";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
interface ReviewAttrs{
  userName:string;
  title:string;
  rating:number;
  text:string;
  createdAt:Date;
}
interface ProductAttrs {
  name: string;
  image: string;
  brand:string;
  price:number;
  category:string;
  countInStock:number;
  description:string;
  rating:number;
  numReviews:number;
  reviews?:any;
  userId: string;
}


interface ProductDoc extends mongoose.Document {
  id:string;
  version:number;
  name: string;
  image: string;
  brand:string;
  price:number;
  category:string;
  countInStock:number;
  description:string;
  rating:number;
  numReviews:number;
  reviews?:any;
  userId: string;
  orderId?: string;
  slug:string;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

  const HelpfulSchema = new mongoose.Schema(
    { owner: {
      type: String
    }},
   {
     toJSON: {
       transform(doc, ret) {
         ret.id = ret._id;
         delete ret._id;
       },
     },
   }
   );
   
const ReviewSchema = new mongoose.Schema(
 { userName: {
    type: String
  },
  title: {
    type: String,
    required: [true, "Please add a title about the product."],
  },
  text: {
    type: String,
    required: [true, "Please add a description about the product."],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please add a rating between 1 and 5"],
  },
  helpful:[HelpfulSchema],
  createdAt: {
    type: Date,
    default: new Date(),
  },
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


const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true }, 
    brand: { type: String, required: true },
    slug:String,
    price: { type: Number, default: 0, required: true },
    category: { type: String, required: true },
    countInStock: { type: Number, default: 0, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0, required: true },
    numReviews: { type: Number, default: 0, required: true },
    reviews: [ReviewSchema],
    userId: {
      type: String,
      required: true,
    },
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
ProductSchema.set('versionKey', 'version');
ProductSchema.plugin(updateIfCurrentPlugin);
ProductSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};
ProductSchema.pre('save', async function(done) {
  this.set('slug',slugify(this.get('name'),{lower:true}))
  done();
});


const Product = mongoose.model<ProductDoc, ProductModel>('Product', ProductSchema);
export { Product };
