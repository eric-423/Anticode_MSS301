import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const login = (credentials) =>
  axios.post(
    'http://localhost:8080/account-service/api/users/login', credentials,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

// Movie Management APIs
export const getAllMovies = (params = {}) =>
  api.get('http://localhost:8082/movies', { params });

export const getMovieById = (id) =>
  api.get(`http://localhost:8082/movies/${id}`);

export const createMovie = (movieData) =>
  api.post('http://localhost:8082/movies/create', movieData);

export const updateMovie = (id, movieData) =>
  api.put(`http://localhost:8082/movies/update/${id}`, movieData);

export const deleteMovie = (id) =>
  api.delete(`http://localhost:8082/movies/delete/${id}`);

export const getShowtimesByMovie = (movieId) =>
  api.get(`http://localhost:8082/movies/${movieId}/showtimes`);

export const getMovies = (params = {}) =>
  api.get('/cinema-service/movies', { params });

export const getShowtimesByMovieDate = (movieId, date) =>
  api.get(`/cinema-service/showtimes/movie/show-time-date/${movieId}`, { params: { date } });

export const getShowtimeById = (showtimeId) =>
  api.get(`/cinema-service/showtimes/${showtimeId}`);

export const getMovieDetail = (movieId) =>
  api.get(`/cinema-service/movies/${movieId}`);

export const getConcessionProducts = (params = {}) =>
  api.get('/cinema-service/concession-products', { params });

export const getConcessionProductDetail = (productId) =>
  api.get(`/cinema-service/concession-products/${productId}`);

export const logout = () =>
  api.get(`/api/users/logout`,);

// Concession Product APIs
export const getAllProducts = (params = {}) =>
  api.get('http://localhost:8082/concession-products', { params });

export const getProductById = (id) =>
  api.get(`http://localhost:8082/concession-products/${id}`);

export const createProduct = (data) =>
  api.post('http://localhost:8082/concession-products', data);

export const updateProduct = (id, data) =>
  api.put(`http://localhost:8082/concession-products/${id}`, data);

export const deleteProduct = (id) =>
  api.delete(`http://localhost:8082/concession-products/${id}`);

export default api;
