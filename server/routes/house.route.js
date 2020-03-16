import express from 'express';
import {
  addHouse, editHouse, findAllHouse, findOneHouse,
} from '../controllers/houseController';
import { verifyAuth } from '../middlewares/authentication';

const houseRouter = express.Router();

houseRouter.post('/house', verifyAuth, addHouse);
houseRouter.patch('/house/:houseId', verifyAuth, editHouse);
houseRouter.get('/houses/', findAllHouse);
houseRouter.get('/houses/:houseId', findOneHouse);

export default houseRouter;
