import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import normalize from 'normalize-url';
import { validateRequest,BadRequestError } from 'azz-sahafrica';
import { User } from '../models/user';
import * as crypto from 'crypto';
import {GMailService} from "../utils/sendEmail";
import  {commonPasswords} from "../utils/common";
const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('name')
      .trim()
      .escape(),
    body('email')
      .normalizeEmail(),
    body('password')
      .not().isIn(commonPasswords).withMessage('Password commonly used on other websites')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password,name } = req.body;
    const existingEmail = await User.findOne({ email });
    const existingName = await User.findOne({ name });

    if (existingEmail) {
      throw new BadRequestError('Email already taken','email');
    }
    if (existingName) {
      throw new BadRequestError('Username already exists','name');
    }
      
    const emailVerificiationCode = crypto.randomBytes(20).toString('hex');
    const avatar = normalize(
      gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      }),
      { forceHttps: true }
    );
    const user = User.build({ name,email, password,emailCode:emailVerificiationCode,avatar,isAdmin:true});
    
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        name: user.name,
        id: user.id,
        email: user.email ,
        validated:user.validated,
        emailCode:user.emailCode,
        dateCreated:user.dateCreated,
        avatar:user.avatar,
        isAdmin:user.isAdmin
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt
    };
    try {
    
      //Send verification Email
      const emailValidationUrl = `https://sahafrica.com/emails/confirm-verification/${user.emailCode}`;
      let gmailService = new GMailService(); 
      gmailService.sendMail( 
        `${user.email}`,  
        "Sahafrica Please verify your email address.",  
        `Almost done,${user.name}!To complete your Sahafrica sign up,we just need  to verify your email address:\n${user.email}\nOnce verified, you can start using all of Sahafrica's services to buy, sell, and see products.\nPaste the following link into your browser:\n${emailValidationUrl}\n
        You will be asked to log in again to make sure it is you.\n
        You’re receiving this email because you recently created a new Sahafrica account . If this wasn’t you, please ignore this email.`).then( (msg) => { 
    });
      res.status(201).send(user);
    } catch (error) {
      delete user.emailCode;
      await user.save({ validateBeforeSave: false });
    }
    } 
);

export { router as signupRouter };
