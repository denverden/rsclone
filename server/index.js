import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routerUser from './routes/userRouter.js';

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  user: process.env.DB_USER,
  pass: process.env.DB_PASSWORD,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user', routerUser);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT || 3000}!`));
