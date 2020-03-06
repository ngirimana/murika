import express from 'express';
import mongoose from 'mongoose';
import bodyParse from 'body-parser';
import dotenv from 'dotenv';
import Config from './config/defaultConfig';


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
app.use(bodyParse.json());

const { port } = Config;
app.listen(port, () => process.stdout.write(`Listening on port ${port} ...\n******************** \n`));
export default app;