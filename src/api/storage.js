import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

const setToken = async (token) => {
  await setItemAsync('token', token);
};

const getToken = async () => {
  if (await isTokenExpired()) return null;
  return await getItemAsync('token');
};

const deleteToken = async () => {
  await deleteItemAsync('token');
};

const isTokenExpired = async () => {
  try {
    const token = await getToken();
    if (!token) return true;

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      await deleteToken();
      return true;
    }

    return false;
  } catch (error) {
    await deleteToken();
    return true;
  }
};

export { setToken, getToken, deleteToken, isTokenExpired };
