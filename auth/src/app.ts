import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { forgotpasswordRouter } from './routes/forgotpassword';
import {resetpasswordRouter} from './routes/reset-password';
import {validateTokenRouter} from './routes/validateToken';
import {validateEmailRouter} from './routes/validate-email';
import {resendEmailRouter} from './routes/resend-email';
import {deleAccountRouter} from './routes/delete-account';
import { errorHandler,NotFoundError } from 'azz-sahafrica';


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(forgotpasswordRouter);
app.use(resetpasswordRouter);
app.use(validateTokenRouter);
app.use(validateEmailRouter);
app.use(resendEmailRouter);
app.use(deleAccountRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
