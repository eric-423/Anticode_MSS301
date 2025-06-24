package com.example.cinemaservice.repository;

import com.example.cinemaservice.entity.TicketType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketTypeRepository extends JpaRepository<TicketType, Integer> {

}
