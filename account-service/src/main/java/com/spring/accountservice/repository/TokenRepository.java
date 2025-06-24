package com.spring.accountservice.repository;

import com.spring.accountservice.entity.VerifyToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepository extends JpaRepository<VerifyToken, Integer> {
    VerifyToken findByToken(String token);

}
