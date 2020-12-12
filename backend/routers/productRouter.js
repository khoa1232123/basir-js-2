import express from 'express';
import data from '../data';

const productRouter = express.Router();

productRouter.get('/', (req, res) => {
  res.send(data.products);
});
productRouter.get('/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not Found' });
  }
});

export default productRouter;
