package com.spring.gatewayservice.config;


import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RouteValidator {

    public static final List<String> openApiEndpoints = List.of(
            "/api/users/forgot-password",
            "/api/users/reset-password",
            "/api/users/register",
            "/api/users/login",
            "/api/users/verify-code",
            "/swagger-ui/index.html",
            "/swagger-ui.html",
            "/user-service/**",
            "/cinema-service/**"
    );

    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().contains(uri));
}
