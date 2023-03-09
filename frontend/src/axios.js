import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:27017',
});

export default instance;
