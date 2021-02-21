import mongoose from 'mongoose';
import { Password } from '../utils/password';

// An interface that describes the properties
// that are requried to create a new User
interface UserAttrs {
  email: string;
  password: string;
  name:string;
  emailCode?:string;
  validated?:boolean;
  avatar?:string;
  isAdmin:boolean;
  dateCreated?:Date;
  resetPasswordToken?:string;
  resetPasswordExpires?:Date;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  name:string;
  emailCode?:string;
  firstTime?:boolean,
  validated:boolean;
  dateCreated:Date;
  avatar:string;
  isAdmin:boolean;
  resetPasswordToken?:string ;
  resetPasswordExpires?: Date  ;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    name:{
      type:String,
      required:true
    },
    validated:{
      type:Boolean,
      default:false
    },
    emailCode: {
      type: String
  },
  isAdmin: { type: Boolean, required: true, default: false },
  dateCreated: {
    type: Date,
    default: Date.now(),
},
  avatar: {
    type: String
  },
    resetPasswordToken: String ,
    resetPasswordExpires: Date 
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
