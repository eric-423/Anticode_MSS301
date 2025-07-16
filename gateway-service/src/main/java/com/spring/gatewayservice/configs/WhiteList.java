package com.spring.gatewayservice.configs;

import java.util.List;

public class WhiteList {
    public static final List<String> PUBLIC_PATHS = List.of(
            "/booking-service/v3/api-docs",
            "/cinema-service/v3/api-docs",
            "/transaction-service/v3/api-docs",
            "/account-service/v3/api-docs",
            "/swagger-ui",
            "/swagger-ui.html",
            "/v3/api-docs/**",
            "/webjars/**"
    );
}
