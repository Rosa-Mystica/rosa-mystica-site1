import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // this pulls from .env
});

export default instance;
