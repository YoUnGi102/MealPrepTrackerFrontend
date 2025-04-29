import axios from 'axios';
import store from './app/store'; // adjust path to your store

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
