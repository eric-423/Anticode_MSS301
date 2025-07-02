import axios from "axios";

const api = axios.create({
    baseURL: 'http://35.247.155.58:8080'
});

export const getDailyRevenue = (date) => 
    api.get(`/transaction-service/dashboard/daily-revenue?date=${date}`);

export const getTicketsSold = (date) => 
    api.get(`/booking-service/dashboard/daily-tickets-sold?date=${date}`);

export const getProductSold = (date) => 
    api.get(`/booking-service/dashboard/daily-product-sold?date=${date}`)

export const getMonthlyProdutRevenue = (date) => 
    api.get(`/booking-service/dashboard/monthly-product-revenue?date=${date}`)

export const getMontlyTicketRevenue = (date) => 
    api.get(`/booking-service/dashboard/monthly-ticket-revenue?date=${date}`)

export const getMovieTop = () => 
    api.get(`/booking-service/dashboard/movie-top-revenue`)

export const getCustomerWeekly = (date) => 
    api.get(`/account-service/dashboard/weekly-customer-registration?date=${date}`)