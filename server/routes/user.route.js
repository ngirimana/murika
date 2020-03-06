import express from 'express';
import userController from '../controllers/userContoller';

const userRouter = express.Router();

userRouter.post('/signup', userController.createuser);
export default userRouter;
