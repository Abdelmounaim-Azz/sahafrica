import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
const winston = require('winston');
import { errorHandler, NotFoundError, currentUser } from 'azz-sahafrica';
import { createProductRouter } from './routes/default';
import { showProductRouter } from './routes/show';
import { indexProductRouter } from './routes/index';
import {ProductFeedBackRouter} from './routes/feedback' ;
import { updateProductRouter } from './routes/update';
import { deleteProductRouter } from './routes/delete';
import { reviewProductRouter } from './routes/reviews';
 
const app = express();
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
logger.log({
  level: 'info',
  message: 'go to elk!'
});
 
logger.info('Hello again  logs');
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);

app.use(ProductFeedBackRouter);
app.use(createProductRouter);
app.use(showProductRouter);
app.use(indexProductRouter);
app.use(updateProductRouter);
app.use(deleteProductRouter);
app.use(reviewProductRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
