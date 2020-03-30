import express from 'express';
import {
  signUp, signIn, changePassword, viewProfile, deleteUser, allUser,
} from '../controllers/userContoller';
import { verifyAuth } from '../middlewares/authentication';
import { verifyIsAdmin } from '../middlewares/checkIsAdmin';

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);
userRouter.get('/viewProfile/', verifyAuth, viewProfile);
userRouter.patch('/profile/changePassword', verifyAuth, changePassword);
userRouter.get('/users/', verifyIsAdmin, allUser);
userRouter.delete('/users/:searchId', verifyIsAdmin, deleteUser);

export default userRouter;
