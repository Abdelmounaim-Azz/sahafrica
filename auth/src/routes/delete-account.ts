import express from 'express';
import { currentUser,BadRequestError,NotAuthorizedError } from 'azz-sahafrica';
import { Password } from '../utils/password';
import { User } from '../models/user';
const router = express.Router();

router.post('/api/users/delete-account', currentUser, async (req, res) => {  
  const {password } = req.body;
  if(req.currentUser){
    const existingUser = await User.findOne({ email:req.currentUser.email });
    if (!existingUser) {
      throw new NotAuthorizedError();
    }//already knows user exist,this condition will never be fulfilled(just for TS to stop bothering me in case it is null)
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Incorrect password.','password');
    }
    
   await User.deleteOne({
      email: req.currentUser.email,
  });
  req.session=null;
  res.status(204).send({})
}});

export { router as deleAccountRouter };
