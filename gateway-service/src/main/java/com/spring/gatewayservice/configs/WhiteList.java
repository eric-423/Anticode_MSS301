package com.spring.gatewayservice.configs;

import java.util.List;

public class WhiteList {
    public static final List<String> PUBLIC_PATHS = List.of(
            "/booking-service/v3/api-docs",
            "/cinema-service/v3/api-docs",
            "cinema-service/**",
            "/transaction-service/v3/api-docs",
            "/account-service/v3/api-docs",
            "/account-service/api/users/login",
            "/swagger-ui",
            "/swagger-ui.html",
            "/v3/api-docs/**",
            "/webjars/**",
            "/api/users/forgot-password",
            "/api/users/reset-password",
            "/api/users/register",
            "/api/users/login",
            "/api/users/verify-code",
            "/swagger-ui/index.html",
            "/account-service/**",
            "/account-service/v3/api-docs",
            "/dashboard/weekly-customer-registration",
            "/cinema-service/cinema-halls",
            "/cinema-service/cinema-halls/**",
            "/cinema-service/concession-products",
            "/cinema-service/concession-products/**",
            "/cinema-service/film-personels",
            "/cinema-service/film-personels/**",
            "/cinema-service/genres",
            "/cinema-service/genres/**",
            "/cinema-service/movies",
            "/cinema-service/movies/**",
            "/cinema-service/hall-types",
            "/cinema-service/hall-types/**",
            "/cinema-service/showtimes",
            "/cinema-service/showtimes/**",
            "/cinema-service/showtime-ticket-prices",
            "/cinema-service/showtime-ticket-prices/**",
            "/cinema-service/ticket-types",
            "/cinema-service/ticket-types/**",
            "/booking-service/showtimes",
            "/booking-service/showtimes/**",
            "/booking-service/booking-concession",
            "/booking-service/booking-concession/**"
    );
}
