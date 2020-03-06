import express from 'express';
import { addHouse } from '../controllers/houseController';

const houseRouter = express.Router();

houseRouter.post('/house', addHouse);

export default houseRouter;
