import express from 'express';
import { addHouse, editHouse } from '../controllers/houseController';

const houseRouter = express.Router();

houseRouter.post('/house', addHouse);
houseRouter.patch('/house/:houseId', editHouse);

export default houseRouter;
