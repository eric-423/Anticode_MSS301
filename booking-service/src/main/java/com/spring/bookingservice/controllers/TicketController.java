package com.spring.bookingservice.controllers;


import com.spring.bookingservice.dtos.TicketDTO;
import com.spring.bookingservice.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ticket")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @GetMapping("")
    public ResponseEntity<List<TicketDTO>> getTickets() {
        return new ResponseEntity<>(ticketService.getTickets(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketDTO> getTicket(@PathVariable int id) {
        return new ResponseEntity<>(ticketService.getTicket(id), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<TicketDTO> createTicket(@RequestBody TicketDTO ticketDTO) {
        return new ResponseEntity<>(ticketService.createTicket(ticketDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TicketDTO> updateTicket(@PathVariable int id, @RequestBody TicketDTO ticketDTO) {
        return new ResponseEntity<>(ticketService.updateTicket(id, ticketDTO), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteTicket(@PathVariable int id) {
        return new ResponseEntity<>(ticketService.deleteTicket(id), HttpStatus.OK);
    }
}
