package com.mss301.anticode.cinema_service.controller;

import com.mss301.anticode.cinema_service.entity.TicketType;
import com.mss301.anticode.cinema_service.service.Imp.TicketTypeServiceImp;
import com.mss301.anticode.cinema_service.service.TicketTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ticket-types")
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
