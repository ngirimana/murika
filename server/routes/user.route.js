import express from 'express';
import {
  signUp,
  signIn,
  changePassword,
  viewProfile,
  deleteUser,
  allUser,
  verifyUser,
  forgotPassward,
  resetPassword,
} from '../controllers/userContoller';
import { verifyAuth } from '../middlewares/authentication';
import { verifyIsAdmin } from '../middlewares/checkIsAdmin';
import { verifiedUser } from '../middlewares/checkIsVerified';

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/signin', verifiedUser, signIn);
userRouter.get('/viewProfile/', verifyAuth, viewProfile);
userRouter.patch('/profile/changePassword', verifyAuth, changePassword);
userRouter.patch('/emailverification/:mailToken', verifyUser);
userRouter.patch('/forgot-password', forgotPassward);
userRouter.patch('/reset-password/:resetToken', resetPassword);
userRouter.get('/users/', verifyIsAdmin, allUser);
userRouter.delete('/users/:searchId', verifyIsAdmin, deleteUser);

export default userRouter;
