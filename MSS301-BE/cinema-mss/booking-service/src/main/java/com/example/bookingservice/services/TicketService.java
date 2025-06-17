package com.example.bookingservice.services;

import com.example.commonservice.dto.SeatDTO;
import com.example.commonservice.dto.TicketDTO;

import java.util.List;

public interface TicketService {
    public TicketDTO getTicket(int id);
    public List<TicketDTO> getTickets();
    List<SeatDTO> getSeatsByShowtime(int showtimeId);
}
