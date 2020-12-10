import data from '../data.js';

const HomeScreen = {
  render: async () => {
    const res = await fetch('http://localhost:5000/api/products', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res || !res.ok) {
      return `<div>Error in getting data</div>`;
    }
    const products = await res.json();
    return `
    <div class="container">
    <div class="row">
    ${products
      .map(
        (product) =>
          `<div class="col-3 mb-4">
        <div class="card">
          <a href="/#/product/${product._id}">
            <img src="${product.image}" class="card-img-top" alt="products" />
          </a>
          <div class="card-body">
            <h5 class="card-title">
              <a href="/#/product/${product._id}">${product.name}</a>
            </h5>
            <p class="card-brand">${product.brand}</p>
            <p class="card-price">${product.price}</p>
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
