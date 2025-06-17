import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8083',
});

export const getMovies = (params = {}) => api.get('/movies', { params });

export default api;
