import express from 'express';
import {
  signUp, signIn, changePassword, viewProfile,
} from '../controllers/userContoller';
import { verifyAuth } from '../middlewares/authentication';

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);
userRouter.get('/viewProfile/', verifyAuth, viewProfile);
userRouter.patch('/profile/changePassword', verifyAuth, changePassword);

export default userRouter;
