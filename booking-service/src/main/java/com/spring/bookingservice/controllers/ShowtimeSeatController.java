package com.spring.bookingservice.controllers;

import com.spring.bookingservice.dtos.SeatDTO;
import com.spring.bookingservice.services.SeatService;
import com.spring.bookingservice.services.TicketService;
import org.apache.coyote.Response;
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

    @Autowired
    private SeatService seatService;

    @GetMapping("/{showtimeId}/seats")
    public ResponseEntity<List<SeatDTO>> getSeats(@PathVariable int showtimeId) {
        return new ResponseEntity<>(ticketService.getSeatsByShowtime(showtimeId), HttpStatus.OK);
    }

    @GetMapping("/{showtimeId}/seats/unavailable")
    public ResponseEntity<?> getUnavailableSeats(@PathVariable int showtimeId) {
        try {
            List<String> unavailableSeats = seatService.getUnavailableSeat(showtimeId);
            return ResponseEntity.ok(unavailableSeats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving unavailable seats: " + e.getMessage());
        }
    }

}
