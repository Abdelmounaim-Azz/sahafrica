import express, { Request, Response, NextFunction } from "express";
import { BadRequestError, validateRequest } from "azz-sahafrica";
import { User } from "../models/user";
import {GMailService} from "../utils/sendEmail";
import { body } from "express-validator";
import * as crypto from 'crypto';
const router = express.Router();


router.post(
  "/api/users/forgotpassword",
  [body('email').isEmail().normalizeEmail().withMessage('That address is not a verified primary email or is not associated with a personal user account.')],
  validateRequest,
  async (req:Request, res:Response) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError('That address is not a verified primary email or is not associated with a personal user account.','email');
    }
    // Get reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.set({
      resetPasswordToken:resetToken ,
      resetPasswordExpires: Date.now() + 86400,
    });
    await user.save({ validateBeforeSave: false });
    // Create reset url
    const resetUrl = `https://sahafrica.com/password_reset/${resetToken}`; 
    try {
      let gmailService = new GMailService(); 
 
    gmailService.sendMail( 
      `${user.email}`,  
      "[Sahafrica] Reset your password Now",  
      `Hello ${user.name}!\n\n
      We heard that you lost your Sahafrica password. Sorry about that!



      But don’t worry! You can use the following link to reset your password:\n\n
      ${resetUrl}\n\n
      If you didn't request this, please ignore this email. Your password will stay safe and won't be changed.`).then( (msg) => { 
        res.send({success:true,
        data:resetUrl})
    } ); 
    } catch (error) {
      delete user.resetPasswordToken;
      delete user.resetPasswordExpires;
      await user.save({ validateBeforeSave: false });
      throw new BadRequestError('Message has not been sent.Please try another time.','email');
    }

  }
);

export { router as forgotpasswordRouter };
