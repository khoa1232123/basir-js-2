import axios from 'axios';
import { apiUrl } from './config';
import { getUserInfo } from './localStorage';

export const getProduct = async (id) => {
  try {
    const res = await axios({
      url: `${apiUrl}/products/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.statusText !== 'OK') {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (error) {
    console.log(error);
    return { error: error.response.data.message || error.message };
  }
};

export const signin = async ({ email, password }) => {
  try {
    const response = await axios({
      url: `${apiUrl}/users/signin`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        password,
      },
    });
    console.log(response);
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    return { error: error.response.data.message || error.message };
  }
};

export const register = async ({ name, email, password }) => {
  try {
    const response = await axios({
      url: `${apiUrl}/users/register`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name,
        email,
        password,
      },
    });
    console.log(response);
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    return { error: error.response.data.message || error.message };
  }
};

export const update = async ({ name, email, password }) => {
  try {
    const { _id, token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/users/${_id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        email,
        password,
      },
    });
    console.log(response);
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    return { error: error.response.data.message || error.message };
  }
};
