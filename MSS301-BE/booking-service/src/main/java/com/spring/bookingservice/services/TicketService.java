package com.spring.bookingservice.services;

import com.spring.bookingservice.dtos.TicketDTO;

import java.util.List;

public interface TicketService {
    public TicketDTO getTicket(int id);
    public List<TicketDTO> getTickets();
    public TicketDTO createTicket(TicketDTO ticket);
    public TicketDTO updateTicket(int id, TicketDTO ticket);
    public boolean deleteTicket(int id);
}
