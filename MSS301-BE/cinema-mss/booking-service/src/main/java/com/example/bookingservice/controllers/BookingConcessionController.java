package com.example.bookingservice.controllers;

import com.example.bookingservice.services.BookingConcessionsService;
import com.example.commonservice.dto.BookingConcessionDTO;
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


}
