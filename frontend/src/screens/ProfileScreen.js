import { update } from '../api';
import { getUserInfo, setUserInfo, clearUser } from '../localStorage';
import { showLoading, showMessage } from '../utils';

const ProfileScreen = {
  after_render: () => {
    document.getElementById('signout-button').addEventListener('click', () => {
      clearUser();
      document.location.hash = '/';
    });
    document
      .getElementById('profile-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading(true);
        const data = await update({
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
        });
        showLoading(false);
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          document.location.hash = '/';
        }
      });
  },
  render: () => {
    const { name, email } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
    return `
  <div class="form-container">
      <form id="profile-form">
        <ul class="form-items">
          <li>
            <h1>Profile</h1>
          </li>
          <li>
            <label for="name">Name</label>
            <input type="name" name="name" id="name" value="${name}" />
          </li>
          <li>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" value="${email}" />
          </li>
          <li>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" />
          </li>
          <li>
            <label for="repassword">Re-Enter Password</label>
            <input type="password" name="repassword" id="repassword" />
          </li>
          <li>
            <button type="submit" class="btn primary border">Update</button>
          </li>
          <li>
            <button type="button" class="btn border" id="signout-button">Sign Out</button>
          </li>
        </ul>
      </form>
    </div>`;
  },
};

export default ProfileScreen;
