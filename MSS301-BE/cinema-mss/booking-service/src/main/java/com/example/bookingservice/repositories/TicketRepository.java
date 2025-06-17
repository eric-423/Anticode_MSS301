package com.example.bookingservice.repositories;

import com.example.bookingservice.pojos.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {

    Ticket getTicketsById(int id);

    java.util.List<Ticket> findByShowtime(int showtime);
}
