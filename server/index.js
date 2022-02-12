import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routerUser from './routes/userRouter.js';
import routerGroup from './routes/groupRouter.js';
import routerText from './routes/textRouter.js';
import routerAchievement from './routes/achievementRouter.js';
import routerLog from './routes/logRouter.js';

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
app.use('/api/group', routerGroup);
app.use('/api/text', routerText);
app.use('/api/achievement', routerAchievement);
app.use('/api/log', routerLog);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT || 3030}!`));
