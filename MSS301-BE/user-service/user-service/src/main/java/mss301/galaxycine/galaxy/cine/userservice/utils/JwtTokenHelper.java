package mss301.galaxycine.galaxy.cine.userservice.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import mss301.galaxycine.galaxy.cine.userservice.entity.Users;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenHelper {
    @Value("${jwt.secretkey}")
    private String key;


    public String generateToken(Users users) {
        SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(key));
        return Jwts.builder()
                .setIssuer("HAG_WORKSHOP")
                .setSubject("JWT Token")
                .claim("id", users.getId())
                .claim("email", users.getEmail())
                .claim("role", users.getRole().getName())
                .claim("username", users.getFullName())
                .claim("phone", users.getPhoneNumber())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date().getTime()) + 28800000))
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
