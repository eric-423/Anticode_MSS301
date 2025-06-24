package com.spring.accountservice.repository;

import com.spring.accountservice.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByEmail(String email);
}
