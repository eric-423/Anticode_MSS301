package com.example.cinemaservice.controller;

import com.example.cinemaservice.entity.TicketType;
import com.example.cinemaservice.service.Imp.TicketTypeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ticket-types")
@CrossOrigin
public class TicketTypeController {
    @Autowired
    private TicketTypeServiceImp ticketTypeServiceImp;

    @GetMapping
    public Iterable<TicketType> getAllTicketTypes() {
        return ticketTypeServiceImp.getAll();
    }

    @GetMapping("/{id}")
    public TicketType getTicketTypeById(Integer id) {
        return ticketTypeServiceImp.getById(id)
                .orElseThrow(() -> new RuntimeException("Ticket Type not found with id: " + id));
    }

    @PostMapping("/create")
    public TicketType createTicketType(TicketType ticketType) {
        return ticketTypeServiceImp.create(ticketType);
    }

    @PutMapping("/update/{id}")
    public TicketType updateTicketType(Integer id, TicketType ticketType) {
        return ticketTypeServiceImp.update(id, ticketType);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTicketType(Integer id) {
        ticketTypeServiceImp.delete(id);
    }
}
