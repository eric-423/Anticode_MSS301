package com.spring.accountservice.repository;

import com.spring.accountservice.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findByNameIgnoreCase(String name);

}
