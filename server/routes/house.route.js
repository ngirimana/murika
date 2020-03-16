import express from 'express';
import { addHouse, editHouse } from '../controllers/houseController';
import { verifyAuth } from '../middlewares/authentication';

const houseRouter = express.Router();

houseRouter.post('/house', verifyAuth, addHouse);
houseRouter.patch('/house/:houseId', verifyAuth, editHouse);

export default houseRouter;
