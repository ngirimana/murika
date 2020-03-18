import express from 'express';
import {
  addHouse, editHouse, findAllHouse, findOneHouse, rentHouse, getAllRentedHouse, searchHouse,
} from '../controllers/houseController';
import { verifyAuth } from '../middlewares/authentication';

const houseRouter = express.Router();

houseRouter.post('/house', verifyAuth, addHouse);
houseRouter.patch('/house/:houseId', verifyAuth, editHouse);
houseRouter.get('/houses/', findAllHouse);
houseRouter.get('/houses/:houseId', findOneHouse);
houseRouter.patch('/house/:houseId/checkout', verifyAuth, rentHouse);
houseRouter.patch('/houses/rented', verifyAuth, getAllRentedHouse);
houseRouter.get('/houses/search-result/:searchParameter', searchHouse);
export default houseRouter;
