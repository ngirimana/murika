import express from 'express';
import {
  signUp,
  signIn,
  changePassword,
  viewProfile,
  deleteUser,
  allUser,
  verifyUser,
} from '../controllers/userContoller';
import { verifyAuth } from '../middlewares/authentication';
import { verifyIsAdmin } from '../middlewares/checkIsAdmin';
import { verifyIsVerified } from '../middlewares/checkIsVerified';

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/signin', verifyIsVerified, signIn);
userRouter.get('/viewProfile/', verifyAuth, viewProfile);
userRouter.patch('/profile/changePassword', verifyAuth, changePassword);
userRouter.get('/emailverification/:mailToken', verifyUser);
userRouter.get('/users/', verifyIsAdmin, allUser);
userRouter.delete('/users/:searchId', verifyIsAdmin, deleteUser);

export default userRouter;
