import express ,{Request,Response}from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/api/users/verification/verify-account/:emailCode',async (req:Request, res:Response) => {
  const {  emailCode } = req.params;
  const existingUser = await User.findOne({ emailCode });
  
  if (!existingUser) {
    return res.send({uservalidated:null})
  }
  existingUser.set('validated',true) ;
  
  await existingUser.save();
  const userJwt = jwt.sign(
    {
      name: existingUser.name,
      id: existingUser.id,
      email: existingUser.email ,
      validated:existingUser.validated,
      emailCode:existingUser.emailCode,
      dateCreated:existingUser.dateCreated,
      avatar:existingUser.avatar
    },
    process.env.JWT_KEY!
  );

  // Store it on session object
  req.session = {
    jwt: userJwt
  };
 
  res.send({uservalidated:existingUser});
});

export { router as validateEmailRouter };