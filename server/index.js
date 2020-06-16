import express from 'express';
import mongoose from 'mongoose';
import bodyParse from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import Config from './config/defaultConfig';
import userRoute from './routes/user.route';
import houseRoute from './routes/house.route';

const app = express();

dotenv.config({ path: './.env' });

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => process.stdout.write('DB Connection succesfully\n'));
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());
app.use('/api/v1/uploads', express.static('uploads'));
app.use('/api/v1/auth', userRoute);
app.use('/api/v1/', houseRoute);
app.use('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Welcome To Murika Home Ltd',
  });
});

const { port } = Config;
app.listen(port, () => process.stdout.write(`Listening on port ${port} ...\n******************** \n`));
export default app;
