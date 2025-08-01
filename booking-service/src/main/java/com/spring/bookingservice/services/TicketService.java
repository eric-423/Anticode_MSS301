package com.spring.bookingservice.services;



import com.spring.bookingservice.dtos.SeatDTO;
import com.spring.bookingservice.dtos.TicketDTO;

import java.util.List;

public interface TicketService {
    public TicketDTO getTicket(int id);
    public List<TicketDTO> getTickets();
    List<SeatDTO> getSeatsByShowtime(int showtimeId);
}
