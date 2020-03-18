import express from 'express';
import {
  addHouse, editHouse, findAllHouse, findOneHouse, rentHouse, getRentedHouse,
  searchHouse,
  getAllRentedHouse,
  deleteHouse,
} from '../controllers/houseController';
import { verifyAuth } from '../middlewares/authentication';
import { verifyIsAdmin } from '../middlewares/checkIsAdmin';

const houseRouter = express.Router();

houseRouter.post('/house', verifyAuth, addHouse);
houseRouter.patch('/house/:houseId', verifyAuth, editHouse);
houseRouter.get('/houses/', findAllHouse);
houseRouter.get('/houses/:houseId', findOneHouse);
houseRouter.patch('/house/:houseId/checkout', verifyAuth, rentHouse);
houseRouter.get('/houses/search-result/:searchParameter', searchHouse);
houseRouter.get('/rented-houses', verifyIsAdmin, getAllRentedHouse);
houseRouter.get('/rented-houses/:houseId', verifyIsAdmin, getRentedHouse);
houseRouter.delete('/house/:houseId', verifyIsAdmin, deleteHouse);

export default houseRouter;
