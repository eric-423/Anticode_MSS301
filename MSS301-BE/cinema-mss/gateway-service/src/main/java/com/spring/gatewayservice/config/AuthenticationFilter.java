package com.spring.gatewayservice.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Objects;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter> {

    @Autowired
    private RouteValidator validator;

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Override
    public GatewayFilter apply(AuthenticationFilter config) {
        return (exchange, chain) -> {
          if(validator.isSecured.test(exchange.getRequest())){
              System.out.println(exchange.getRequest().getURI().getPath()+"uri");
             if(!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)){
                 throw new RuntimeException("Missing authorization header");
             }
             String authHeader = Objects.requireNonNull(exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION)).getFirst();
              if (authHeader != null && authHeader.startsWith("Bearer ")) {
                  authHeader = authHeader.substring(7);
              }
              return webClientBuilder.build()
                      .get()
                      .uri("http://user-service/auth/validate?token=" + authHeader)
                      .retrieve()
                      .bodyToMono(Void.class)
                      .then(chain.filter(exchange))
                      .onErrorResume(e -> {
                          exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                          return exchange.getResponse().setComplete();
                      });
          }
          return chain.filter(exchange);
        };
    }

}
