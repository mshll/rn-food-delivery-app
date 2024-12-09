import instance from '.';

export const getProfile = async () => {
  const response = await instance.get('/auth/profile');
  return response.data;
};

export const login = async (username, password) => {
  const response = await instance.post('/auth/login', { username, password });
  return response.data;
};

export const register = async (username, password, image) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('image', image);

  const response = await instance.post('/auth/register', formData);
  return response.data;
};
