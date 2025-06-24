package com.spring.bookingservice.controllers;

import com.spring.bookingservice.dtos.SeatDTO;
import com.spring.bookingservice.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/showtimes")
public class ShowtimeSeatController {

    @Autowired
    private TicketService ticketService;

    @GetMapping("/{showtimeId}/seats")
    public ResponseEntity<List<SeatDTO>> getSeats(@PathVariable int showtimeId) {
        return new ResponseEntity<>(ticketService.getSeatsByShowtime(showtimeId), HttpStatus.OK);
    }
}
