import axios from 'axios';
import PaymentMethod from './../components/customer/booking-ticket/choose-seat/payment/payment-method/PaymentMethod';

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
export const logout = () =>
  api.get(`/api/users/logout`,);

// Movie Management APIs
export const getAllMovies = (params = {}) =>
  api.get('http://localhost:8080/cinema-service/movies', { params },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

export const getMovieById = (id) =>
  api.get(`http://localhost:8080/cinema-service/movies/${id}`);

export const createMovie = (movieData) =>
  api.post('http://localhost:8080/cinema-service/movies/create', movieData);

export const updateMovie = (id, movieData) =>
  api.put(`http://localhost:8080/cinema-service/movies/update/${id}`, movieData);

export const deleteMovie = (id) =>
  api.delete(`http://localhost:8080/cinema-service/movies/delete/${id}`);

export const getShowtimesByMovie = (movieId) =>
  api.get(`http://localhost:8080/cinema-service/movies/${movieId}/showtimes`);

export const getMovies = (params = {}) =>
  api.get('http://localhost:8080/cinema-service/movies', { params }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getShowtimesByMovieDate = (movieId, date) =>
  api.get(`http://localhost:8080/cinema-service/showtimes/movie/show-time-date/${movieId}`, { params: { date } }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getShowtimeById = (showtimeId) =>
  api.get(`http://localhost:8080/cinema-service/showtimes/${showtimeId}`);

export const getMovieDetail = (movieId) =>
  api.get(`http://localhost:8080/cinema-service/movies/${movieId}`);

export const getConcessionProducts = (params = {}) =>
  api.get('http://localhost:8080/cinema-service/concession-products', { params });

export const getConcessionProductDetail = (productId) =>
  api.get(`http://localhost:8080/cinema-service/concession-products/${productId}`);



// Concession Product APIs
export const getAllProducts = (params = {}) =>
  api.get('http://localhost:8080/cinema-service/concession-products', { params });

export const getProductById = (id) =>
  api.get(`http://localhost:8080/cinema-service/concession-products/${id}`);

export const createProduct = (data) =>
  api.post('http://localhost:8080/cinema-service/concession-products', data);

export const updateProduct = (id, data) =>
  api.put(`http://localhost:8080/cinema-service/concession-products/${id}`, data);

export const deleteProduct = (id) =>
  api.delete(`http://localhost:8080/cinema-service/concession-products/${id}`);

export const createBooking = (bookingData) =>
  api.post('http://localhost:8080/booking-service/api/booking', bookingData);

export const getShowtimeTicketPrice = (showtimeId, ticketType) =>
  api.get(`http://localhost:8080/cinema-service/showtime-ticket-prices/showtime/${showtimeId}/ticket-type/${ticketType}`);

export const createPayment = (bookingId, payment) =>
  api.post(`http://localhost:8080/booking-service/api/payment/create?bookingId=${bookingId}`, payment);


