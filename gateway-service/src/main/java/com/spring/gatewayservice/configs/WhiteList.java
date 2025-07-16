package com.spring.gatewayservice.configs;

import java.util.List;

public class WhiteList {
    public static final List<String> PUBLIC_PATHS = List.of(
            "/booking-service/v3/api-docs",
            "/cinema-service/v3/api-docs",
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
            "/dashboard/weekly-customer-registration"
    );
}
