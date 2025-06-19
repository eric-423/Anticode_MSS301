package com.spring.gatewayservice.config;


import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RouteValidator {

    public static final List<String> openApiEndpoints = List.of(
            "/users/forgot-password",
            "/users/reset-password",
            "/users/register",
            "/users/login",
            "/users/verify-code",
            "/swagger-ui/index.html",
            "/user-service/*",
            "/cinema-service/*"
    );

    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().contains(uri));
}
