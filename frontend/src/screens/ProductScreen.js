import { parseRequestUrl } from '../utils';
import { getProduct } from '../api';
import Rating from '../components/Rating';

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById('add-button').addEventListener('click', () => {
      document.location.hash = `/cart/${request.id}`;
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);

    console.log({ nguyendinhkhoi: product });
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    return `<div class="content">
      <div class="back-to-result">
        <a href="/#/">back to result</a>
      </div>
      <div class="details">
        <div class="details-image">
          <img src="${product.image}" alt="${product.name}"/>
        </div>
        <div class="details-info">
        <ul>
          <li>
          <h1>${product.name}</h1>
          </li>
          <li>
            ${Rating.render({
              value: product.rating,
              text: `${product.numReviews} reviews`,
            })}
          </li>
          <li>
          Price: <b>$${product.price}</b>
          </li>
          <li>
          Description: <p>${product.description}</p>
          </li>

        </ul>
        </div>
        <div class="details-action">
          <ul>
            <li>
            Price: <b>$${product.price}</b>
            </li>
            <li>
            Status: ${
              product.countInStock > 0
                ? `<span class="success">In Stock</span>`
                : `<span class="error">Out Stock</span>`
            }
            </li>
            <li>
              <button id="add-button" class="btn primary w-100">
              Add to cart
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>`;
  },
};
export default ProductScreen;
