package com.example.cinemaservice.repository;

import com.example.cinemaservice.entity.HallType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HallTypeRepository extends JpaRepository<HallType, Integer> {

}
