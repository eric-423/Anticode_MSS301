package com.spring.bookingservice.services.Impl;

import com.spring.bookingservice.dtos.TicketDTO;
import com.spring.bookingservice.pojos.Ticket;
import com.spring.bookingservice.repositories.TicketRepository;
import com.spring.bookingservice.services.TicketService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TicketServiceImpl implements TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public TicketDTO getTicket(int id) {
       try {
           Ticket ticket = ticketRepository.getTicketsById(id);
           TicketDTO ticketDTO = new TicketDTO();
           BeanUtils.copyProperties(ticket, ticketDTO);
           return ticketDTO;
       } catch (RuntimeException e) {
           throw new RuntimeException(e);
       }
    }

    @Override
    public List<TicketDTO> getTickets() {
        try {
            List<Ticket> tickets = ticketRepository.findAll();
            List<TicketDTO> ticketDTOs = new ArrayList<>();
            tickets.forEach(ticket -> {
                TicketDTO ticketDTO = new TicketDTO();
                BeanUtils.copyProperties(ticket, ticketDTO);
                ticketDTOs.add(ticketDTO);
            });
            return ticketDTOs;
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public TicketDTO createTicket(TicketDTO ticketDTO) {
       try {
           Ticket ticket = new Ticket();
           BeanUtils.copyProperties(ticketDTO, ticket);
           Ticket ticketReturn = ticketRepository.save(ticket);
           TicketDTO ticketDTOReturn = new TicketDTO();
           BeanUtils.copyProperties(ticketReturn, ticketDTOReturn);
           return ticketDTOReturn;
       } catch (RuntimeException e) {
           throw new RuntimeException(e);
       }
    }

    @Override
    public TicketDTO updateTicket(int id, TicketDTO ticketDTO) {
        try{
            Ticket ticket = ticketRepository.getTicketsById(id);
            BeanUtils.copyProperties(ticketDTO, ticket);
            Ticket ticketReturn = ticketRepository.save(ticket);
            TicketDTO ticketDTOReturn = new TicketDTO();
            BeanUtils.copyProperties(ticketReturn, ticketDTOReturn);
            return ticketDTOReturn;
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean deleteTicket(int id) {
        try {
            ticketRepository.deleteById(id);
            return true;
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
}
