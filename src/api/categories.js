import instance from '.';

export const getCategories = async () => {
  const response = await instance.get('/api/category');
  return response.data;
};
