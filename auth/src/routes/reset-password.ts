import express,{Request,Response} from 'express';
import { body } from 'express-validator';
import { BadRequestError,validateRequest  } from "azz-sahafrica";
import { User } from "../models/user";
import {commonPasswords} from "../utils/common";
import jwt from 'jsonwebtoken';
const router = express.Router();

router.put('/api/users/password_reset/:resetToken',[
  body('password')
      // .not().isIn(commonPasswords).withMessage('commonly used as a password')(I choose not to implement it here(not bother a user a lot just by trying to change password) but it is working on signup...)
],
validateRequest, async (req:Request, res:Response) => {
  const resetPasswordToken=req.params.resetToken;
  const user = await User.findOne({
    resetPasswordToken
   });
 if (!user) {
     throw new BadRequestError('It looks like you clicked on an invalid password reset link. Please try again.','password');
   }
   // Set new password
  user.set('password',req.body.password) ;
  user.resetPasswordToken=undefined ;
  user.resetPasswordExpires=undefined;
 
  await user.save();
   // Generate JWT
   const userJwt = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
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

  res.status(200).send(user);
});

export { router as resetpasswordRouter };
