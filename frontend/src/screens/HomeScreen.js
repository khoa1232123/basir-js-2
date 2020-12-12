import axios from 'axios';
import Rating from '../components/Rating';

const HomeScreen = {
  render: async () => {
    const res = await axios({
      url: 'http://localhost:5000/api/products',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res || res.statusText !== 'OK') {
      return '<div>Error in getting data</div>';
    }
    const products = res.data;
    return `
    <div class="container">
    <div class="row mt-4">
    ${products
      .map(
        (product) => `<div class="col-3 mb-4">
          <div class="card">
            <a href="/#/product/${product._id}">
              <img src="${product.image}" class="card-img-top" alt="products" />
            </a>
            <div class="card-body">
              <h5 class="product-title">
                <a href="/#/product/${product._id}">${product.name}</a>
              </h5>
              <div class="product-brand">${product.brand}</div>
              <div class="product-rating">
              ${Rating.render({
                value: product.rating,
                text: `${product.numReviews} reviews`,
              })}
              </div>
              <div class="product-price">${product.price}</div>
              <a href="#" class="btn btn-primary">
                Add to Card
              </a>
            </div>
          </div>
        </div>
      `
      )
      .join('\n')}
      </div>
    </div>
    `;
  },
};

export default HomeScreen;
