import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

const showtimeApi = axios.create({
  baseURL: 'http://localhost:8082',
});

export const getMovies = (params = {}) =>
  api.get('/cinema-service/movies', { params });

export const getShowtimesByMovie = (movieId) =>
  api.get(`/cinema-service/showtimes/movie/${movieId}`);

export const getShowtimesByMovieDate = (movieId, date) =>
  showtimeApi.get(`/showtimes/movie/show-time-date/${movieId}`, { params: { date } });

export default api;
