import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.PUBLIC_URL,
});

export default instance;
