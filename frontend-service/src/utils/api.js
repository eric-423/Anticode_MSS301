import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});


export const getMovies = (params = {}) =>
  api.get('/cinema-service/movies', { params });

export const getShowtimesByMovie = (movieId) =>
  api.get(`/cinema-service/showtimes/movie/${movieId}`);

export const getShowtimesByMovieDate = (movieId, date) =>
  api.get(`/cinema-service/showtimes/movie/show-time-date/${movieId}`, { params: { date } });

export const getMovieDetail = (movieId) =>
  api.get(`/cinema-service/movies/${movieId}`);

export const getConcessionProducts = (params = {}) =>
  api.get('/cinema-service/concession-products', { params });

export const getConcessionProductDetail = (productId) =>
  api.get(`/cinema-service/concession-products/${productId}`);

export default api;
