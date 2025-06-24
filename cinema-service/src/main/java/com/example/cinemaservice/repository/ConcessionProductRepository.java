package com.example.cinemaservice.repository;

import com.example.cinemaservice.entity.ConcessionProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConcessionProductRepository extends JpaRepository<ConcessionProduct, Integer> {

}
