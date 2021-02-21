import express from 'express';
import { User } from "../models/user";
import { BadRequestError } from 'azz-sahafrica';

const router = express.Router();

router.get('/api/users/validate_token/:resetToken',async (req, res) => {
  const resetPasswordToken=req.params.resetToken 
  const user = await User.findOne({
    resetPasswordToken
   });
  if (!user) {
    throw new BadRequestError('It looks like you clicked on an invalid password reset link. Please try again.','resetlink');
  }
  res.send({userName:user?.name,errEmail:''});
});

export { router as validateTokenRouter };