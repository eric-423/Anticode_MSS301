package com.spring.gatewayservice.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtAuthenticationConverter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import reactor.core.publisher.Flux;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.List;

import static com.spring.gatewayservice.configs.WhiteList.PUBLIC_PATHS;

@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        return http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeExchange(exchanges -> exchanges
                        .pathMatchers(PUBLIC_PATHS.toArray(new String[0])).permitAll()
                        .pathMatchers("/account-service/api/system-account/view/*").hasAuthority("ADMIN")
                        .pathMatchers("/game-service/api/v1/games/update/*").hasAnyAuthority("ADMIN")
                        .pathMatchers("/booking-service/dashboard/*").hasAuthority("MANAGER")
                        .pathMatchers("/transaction-service/dashboard/*").hasAuthority("MANAGER")
                        .pathMatchers("/account-service/dashboard/*").hasAuthority("MANAGER")
                        .pathMatchers("/account-service/api/users/profile/**").hasAnyAuthority("USER","ADMIN","MANAGER")
                        .pathMatchers("/booking-service/ai/vertex/**").hasAnyAuthority("USER", "ADMIN", "MANAGER")
                        .pathMatchers(HttpMethod.POST, "/booking-service/api/booking/").hasAnyAuthority("USER")
                        .pathMatchers(HttpMethod.GET, "/booking-service/api/booking/customer/**").hasAnyAuthority("USER", "ADMIN", "MANAGER")
                        .pathMatchers("/booking-service/api/payment/**").hasAnyAuthority("USER", "ADMIN", "MANAGER")
                        .pathMatchers("/booking-service/ticket/**").hasAnyAuthority("ADMIN", "MANAGER", "USER")
                        .pathMatchers("/transaction-service/api/payment-status/**").hasAnyAuthority("ADMIN", "MANAGER", "USER")
                        .pathMatchers("/transaction-service/**").hasAnyAuthority("ADMIN", "MANAGER", "USER")
                        .anyExchange().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt
                                .jwtAuthenticationConverter(grantedAuthoritiesExtractor())
                        )
                )
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173", "http://35.240.150.111"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }


    @Bean
    public ReactiveJwtAuthenticationConverter grantedAuthoritiesExtractor() {
        ReactiveJwtAuthenticationConverter converter = new ReactiveJwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(jwt -> {
            String role = jwt.getClaimAsString("role");
            List<SimpleGrantedAuthority> granted = List.of(new SimpleGrantedAuthority(role.toUpperCase()));
            return Flux.fromIterable(granted);
        });
        return converter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
