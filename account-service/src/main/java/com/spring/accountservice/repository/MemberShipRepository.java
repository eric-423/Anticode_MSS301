package com.spring.accountservice.repository;


import com.spring.accountservice.entity.MemberShip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MemberShipRepository extends JpaRepository<MemberShip, Integer> {
    MemberShip findByNameIgnoreCase(String name);

}
