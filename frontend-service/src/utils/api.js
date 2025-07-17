import axios from 'axios';

const api = axios.create({
  baseURL: 'http://35.247.155.58:8080',
  headers: {
    'Content-Type': 'application/json',
  },

});

export const register = (credentials) =>
  api.post('/account-service/api/users/register', credentials);

export const verifyOTP = (otp) =>
  api.post('/account-service/api/users/verify-code', otp);

export const login = (credentials) =>
  api.post('/account-service/api/users/login', credentials);
export const logout = () =>
  api.get(`/api/users/logout`);

export const getAllAccounts = () =>
  api.get('/api/users/list');

// Movie Management APIs
export const getAllMovies = (params = {}) =>
  api.get('/cinema-service/movies', { params });

export const getMovieById = (id) =>
  api.get(`/cinema-service/movies/${id}`);

export const createMovie = (movieData) =>
  api.post('/cinema-service/movies/create', movieData);

export const updateMovie = (id, movieData) =>
  api.put(`/cinema-service/movies/update/${id}`, movieData,);

export const deleteMovie = (id) =>
  api.delete(`/cinema-service/movies/delete/${id}`,);

export const getShowtimesByMovie = (movieId) =>
  api.get(`/cinema-service/movies/${movieId}/showtimes`,);

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



// Concession Product APIs
export const getAllProducts = (params = {}) =>
  api.get('/cinema-service/concession-products', { params });

export const getProductById = (id) =>
  api.get(`/cinema-service/concession-products/${id}`);

export const createProduct = (data) =>
  api.post('/cinema-service/concession-products', data);

export const updateProduct = (id, data) =>
  api.put(`/cinema-service/concession-products/${id}`, data);

export const deleteProduct = (id) =>
  api.delete(`/cinema-service/concession-products/${id}`);

export const createBooking = (bookingData) =>
  api.post('/booking-service/api/booking', bookingData, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }
  );

export const getShowtimeTicketPrice = (showtimeId, ticketType) =>
  api.get(`/cinema-service/showtime-ticket-prices/showtime/${showtimeId}/ticket-type/${ticketType}`);

export const createPayment = (bookingId, payment) =>
  api.post(`/booking-service/api/payment/create?bookingId=${bookingId}`, payment);

export const getSeatsByShowtime = (showtimeId) =>
  api.get(`/booking-service/showtimes/${showtimeId}/seats/unavailable`);

export const checkStudentDiscount = (image) =>
  api.post(`/booking-service/ai/vertex/check-image`, image);

export const getHistoryBooking = (userId) =>
  api.get(`/booking-service/api/booking/customer/${userId}`);