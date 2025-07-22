package com.spring.accountservice.repository;

import com.spring.accountservice.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;


@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByEmail(String email);

    @Query("SELECT COUNT(u) FROM Users u WHERE u.createdAt >= :startDate AND u.createdAt < :endDate")
    Integer countByRegistrationDateBetween(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    Users getUsersById(int id);
}
