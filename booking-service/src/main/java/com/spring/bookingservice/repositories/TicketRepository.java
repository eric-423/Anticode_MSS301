package com.spring.bookingservice.repositories;

import com.spring.bookingservice.pojos.Booking;
import com.spring.bookingservice.pojos.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {

    Ticket getTicketsById(int id);

    List<Ticket> findByShowtime(int showtime);

    List<Ticket> getTicketsByBookingContaining(Booking booking);

    List<Ticket> getTicketsByBooking(Booking booking);

    List<Ticket> getTicketsByBooking_Id(int bookingId);

    List<Ticket> getTicketsByShowtime(int showtime);
}
