import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface Global {
      signinAdmin(): string[];
      signinnotAdmin(): string[];
    }
  }
}

jest.mock('../nats-wrapper');

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signinnotAdmin = () => {
 
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
    name:'testUser',
    validated:'true',
    emailCode:"66e7ea918a5cba6cc74dfe8b8028f40aa5807087",
    dateCreated: new Date(),
    avatar:"https://gravatar.com/avatar/b1be4c0e4c16808d92eb4d9dc7777fc4?d=mm&r=pg&s=200",
    isAdmin:false
  };

  
  const session = JSON.stringify({ jwt: jwt.sign(payload, process.env.JWT_KEY!) });

  const base64 = Buffer.from(session).toString('base64');

  return [`express:sess=${base64}`];
};
global.signinAdmin = () => {

  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
    name:'testUser',
    validated:'true',
    emailCode:"66e7ea918a5cba6cc74dfe8b8028f40aa5807087",
    dateCreated: new Date(),
    avatar:"https://gravatar.com/avatar/b1be4c0e4c16808d92eb4d9dc7777fc4?d=mm&r=pg&s=200",
    isAdmin:true
  };

  
  const session = JSON.stringify({ jwt: jwt.sign(payload, process.env.JWT_KEY!) });

  const base64 = Buffer.from(session).toString('base64');

  
  return [`express:sess=${base64}`];
};