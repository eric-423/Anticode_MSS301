package com.spring.accountservice.utils;

import com.spring.accountservice.entity.Users;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenHelper {
    @Value("${jwt.secretkey}")
    private String key;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public String generateToken(Users users) {
        SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(key));
        JwtBuilder builder = Jwts.builder()
                .setIssuer("AntiCode")
                .setSubject("JWT Token")
                .claim("id", users.getId())
                .claim("email", users.getEmail())
                .claim("role", users.getRole().getName())
                .claim("username", users.getFullName())
                .claim("phone", users.getPhoneNumber())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date().getTime()) + 28800000));

        if (users.getDateOfBirth() != null) {
            builder.claim("dateOfBirth", users.getDateOfBirth().toString());
        }

        return builder
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean verifyToken(String token) {
        SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(key));
        try {
            Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getTokenFromHeader() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            String bearerToken = request.getHeader("Authorization");
            if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
                return bearerToken.substring(7);
            }
        }
        return null;
    }

    public Claims getClaimsFromToken(String token) {
        SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(key));
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public Integer getUserIdFromToken() {
        String token = getTokenFromHeader();
        if (token != null) {
            Claims claims = getClaimsFromToken(token);
            return claims.get("id", Integer.class);
        }
        return null;
    }
}
