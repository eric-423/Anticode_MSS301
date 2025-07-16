package com.spring.gatewayservice.configs;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;

import javax.crypto.SecretKey;

@Configuration
public class JwtDecoderConfig {
    @Value("${jwt.secretkey}")
    private String secret;

    @Bean
    public ReactiveJwtDecoder jwtDecoder() {
        SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
        return NimbusReactiveJwtDecoder.withSecretKey(secretKey).build();

    }
}
