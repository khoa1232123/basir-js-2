import { getUserInfo } from '../localStorage';

const Header = {
  render: () => {
    const { name } = getUserInfo();
    return `
    <div class="brand">
      <a href="#">Jsamazone</a>
    </div>
    <div>
      ${
        name
          ? `<a href="/#/profile">${name}</a>`
          : `<a href="/#/signin">Signin</a>`
      }
      <a href="#">Cart</a>
    </div>
    `;
  },
  after_render: () => {},
};

export default Header;
