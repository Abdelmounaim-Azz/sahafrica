import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Password } from '../utils/password';
import { User } from '../models/user';
import { BadRequestError } from 'azz-sahafrica';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email')
      .normalizeEmail(),
  ],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Incorrect email or password.','email');
    }
  
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Incorrect email or password.','password');
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        validated:existingUser.validated,
        emailCode:existingUser.emailCode,
        dateCreated:existingUser.dateCreated,
        avatar:existingUser.avatar,
        isAdmin:existingUser.isAdmin,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
