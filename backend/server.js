import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import userRouter from './routers/userRouter';
import productRouter from './routers/productRouter';

mongoose
  .connect(config.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connect to mongodb');
  })
  .catch((error) => {
    console.log(error.reason);
  });

const app = express();
app.use(cors());
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);

app.listen(5000, () => {
  console.log('server at http://localhost:5000');
});
