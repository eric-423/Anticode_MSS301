package com.example.userservice.repository;

import com.example.userservice.entity.VerifyToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface VerifyTokenRepository extends JpaRepository<VerifyToken, Integer> {
    VerifyToken findByToken(String token);

}
