import express from 'express';
import { signUp, signIn } from '../controllers/userContoller';

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/sigin', signIn);
export default userRouter;
