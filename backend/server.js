import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
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
app.use(bodyParser.json());
app.use(cors());
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({ message: err.message });
});

app.listen(5000, () => {
  console.log('server at http://localhost:5000');
});
