package com.spring.bookingservice.controllers;

import com.spring.bookingservice.dtos.BookingCustomerDTO;
import com.spring.bookingservice.dtos.BookingDTO;
import com.spring.bookingservice.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("")
    public ResponseEntity<List<BookingDTO>> getAllBookings() {
        return new ResponseEntity<>(bookingService.getBookings(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable int id) {
        return new ResponseEntity<>(bookingService.getBooking(id), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingDTO bookingDTO) {
        return new ResponseEntity<>(bookingService.createBooking(bookingDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingDTO> updateBooking(@PathVariable int id, @RequestBody BookingDTO bookingDTO) {
        return new ResponseEntity<>(bookingService.updateBooking(id, bookingDTO), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteBooking(@PathVariable int id) {
        return new ResponseEntity<>(bookingService.deleteBooking(id), HttpStatus.OK);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<BookingCustomerDTO>> getBookingsByCustomerId(@PathVariable int customerId) {
        return new ResponseEntity<>(bookingService.getBookingsByCustomerId(customerId), HttpStatus.OK);
    }

    @GetMapping("/customer/booking/{id}")
    public ResponseEntity<BookingCustomerDTO> getBookingByIdForCustomer(@PathVariable int id) {
        return new ResponseEntity<>(bookingService.getBookingByIdForCustomer(id), HttpStatus.OK);
    }
}
