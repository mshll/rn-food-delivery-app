import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-native-food-delivery-be.eapi.joincoded.com',
});

export default instance;