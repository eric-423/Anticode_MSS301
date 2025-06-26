package com.spring.bookingservice.repositories;

import com.spring.bookingservice.pojos.Booking;
import com.spring.bookingservice.pojos.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {

    Ticket getTicketsById(int id);

    List<Ticket> findByShowtime(int showtime);

    List<Ticket> getTicketsByBooking_Id(int bookingId);

    List<Ticket> getTicketsByShowtime(int showtime);
}
