package com.spring.bookingservice.controllers;

import com.spring.bookingservice.dtos.BookingConcessionDTO;
import com.spring.bookingservice.services.BookingConcessionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking-concession")
public class BookingConcessionController {

    @Autowired
    private BookingConcessionsService bookingConcessionsService;

    @GetMapping("")
    public ResponseEntity<List<BookingConcessionDTO>> getBookingConcessions() {
        return new ResponseEntity<>(bookingConcessionsService.getBookingConcessions(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingConcessionDTO> getBookingConcessionById(@PathVariable("id") int id) {
        return new ResponseEntity<>(bookingConcessionsService.getBookingConcession(id), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<BookingConcessionDTO> createBookingConcession(@RequestBody BookingConcessionDTO bookingConcession) {
        return new ResponseEntity<>(bookingConcessionsService.createBookingConcession(bookingConcession), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingConcessionDTO> updateBookingConcession(@RequestBody BookingConcessionDTO bookingConcession, @PathVariable("id") int id) {
        return new ResponseEntity<>(bookingConcessionsService.updateBookingConcession(id, bookingConcession), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteBookingConcession(@PathVariable("id") int id) {
        return new ResponseEntity<>(bookingConcessionsService.deleteBookingConcession(id),HttpStatus.OK);
    }

}
