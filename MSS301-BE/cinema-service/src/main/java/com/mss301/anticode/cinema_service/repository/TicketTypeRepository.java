package com.mss301.anticode.cinema_service.repository;

import com.mss301.anticode.cinema_service.entity.TicketType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketTypeRepository extends JpaRepository<TicketType, Integer> {

}
