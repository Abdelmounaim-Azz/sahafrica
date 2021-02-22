import express from 'express';
import {GMailService} from "../utils/sendEmail";
import { currentUser } from 'azz-sahafrica';
import { BadRequestError,NotAuthorizedError } from 'azz-sahafrica';

const router = express.Router();

router.post('/api/users/resend-email', currentUser, (req, res) => {
  if(!req.currentUser){
    throw new NotAuthorizedError()
  }
  try {
    //Send verification Email
    const emailValidationUrl = `https://sahafrica.com/emails/confirm-verification/${req.currentUser.emailCode}`;
    let gmailService = new GMailService(); 
    gmailService.sendMail( 
      `${req.currentUser.email}`,  
      "[Sahafrica] Please verify your email address.",  
      `Almost done,${req.currentUser.name}!To complete your Sahafrica sign up,we just need  to verify your email address:\n${req.currentUser.email}\nOnce verified, you can start using all of Sahafrica's services to buy, sell, and see products.\nPaste the following link into your browser:\n${emailValidationUrl}\n
      You will be asked to log in again to make sure it is you.\n
      You’re receiving this email because you recently created a new Sahafrica account. If this wasn’t you, please ignore this email.`).then( (msg) => { 
  });
  return res.send({message:"Email has been resent!Check your Email."})
  } catch (error) {
    throw new BadRequestError("email has not been resent!Try another Time.","email")
  }

  
});
export { router as resendEmailRouter };