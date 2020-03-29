import express from 'express';
import {
  addHouse, editHouse, findAllHouse, findOneHouse, rentHouse, getRentedHouse,
  searchHouse, getAllRentedHouse, deleteOneHouse, HouseIRented,
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
houseRouter.get('/rented-houses', verifyAuth, verifyIsAdmin, getAllRentedHouse);
houseRouter.get('/rented-houses/:houseId', verifyAuth, verifyIsAdmin, getRentedHouse);
houseRouter.get('/my-rented-houses', verifyAuth, HouseIRented);
houseRouter.delete('/houses/:houseId', verifyAuth, deleteOneHouse);


export default houseRouter;
