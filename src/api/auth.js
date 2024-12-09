import instance from '.';
import { setToken } from './storage';

export const getProfile = async () => {
  const response = await instance.get('/api/auth/profile');
  return response.data;
};

export const login = async (username, password) => {
  const response = await instance.post('/api/auth/login', { username, password });
  await setToken(response.data.token);
  return response.data;
};

export const register = async (username, password, image) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('image', image);

  const response = await instance.post('/api/auth/register', formData);

  await setToken(response.data.token);
  return response.data;
};
