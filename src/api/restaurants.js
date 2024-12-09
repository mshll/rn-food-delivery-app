import instance from '.';

export const getRestaurants = async () => {
  const response = await instance.get('/api/resturant'); // backend has a typo :(
  return response.data;
};

export const getRestaurantById = async (id) => {
  const response = await instance.get(`/api/resturant/${id}`);
  return response.data;
};

export const getRestaurantItems = async (id) => {
  const response = await instance.get(`/api/resturant/${id}/items`);
  return response.data;
};
