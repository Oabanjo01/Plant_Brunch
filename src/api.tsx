import {API_KEY, BASE_URL} from '@env';
import axios from 'axios';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {Authorization: API_KEY},
});

export const generateConfigObject = (
  method: string,
  endpoint: string,
  params?: {},
) => {
  const url = `${endpoint}?key=${API_KEY}`;
  return {
    method,
    url,
    params,
  };
};

instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    // console.log('good: response', response);
    return response;
  },
  error => {
    console.log('wahaleaux: error', error);
    return Promise.reject(error);
  },
);

export default instance;
