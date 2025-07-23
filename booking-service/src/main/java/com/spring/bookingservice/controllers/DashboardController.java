package com.spring.bookingservice.controllers;

import com.spring.bookingservice.dtos.*;
import com.spring.bookingservice.services.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/order-history")
    public ResponseEntity<List<BookingDTO>> getOrderHistory(@RequestParam(defaultValue = "0") int page,
                                                             @RequestParam(defaultValue = "10") int size){
        return new ResponseEntity<>(dashboardService.getOrderHistory(page,size), HttpStatus.OK);
    }

    @GetMapping("/daily-tickets-sold")
    public ResponseEntity<TicketSoldDTO> getDailyTicketsSold(@RequestParam  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        return new ResponseEntity<>(dashboardService.getDailyTicketsSold(date), HttpStatus.OK);
    }

    @GetMapping("/daily-product-sold")
    public ResponseEntity<ProductSoldDTO> getDailyProductsSold(@RequestParam  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        return new ResponseEntity<>(dashboardService.getDailyProductsSold(date), HttpStatus.OK);
    }

    @GetMapping("/monthly-ticket-revenue")
    public ResponseEntity<List<TicketRevenueDTO>> getMonthlyTicketRevenue(@RequestParam  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        return new ResponseEntity<>(dashboardService.getMonthlyTicketRevenue(date), HttpStatus.OK);
    }

    @GetMapping("/monthly-product-revenue")
    public ResponseEntity<List<ProductRevenueDTO>> getMonthlyProductRevenue(@RequestParam  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        return new ResponseEntity<>(dashboardService.getMonthlyProductRevenue(date), HttpStatus.OK);
    }

    @GetMapping("/movie-top-revenue")
    public ResponseEntity<List<MovieRevenueDTO>> getMovieTopRevenue() {
        return new ResponseEntity<>(dashboardService.getMovieRevenueTop(), HttpStatus.OK);
    }

    @GetMapping("/user-by-booking-id/{bookingId}")
    public ResponseEntity<Integer> getUserByBookingId(@PathVariable int bookingId) {
        return new ResponseEntity<>(dashboardService.getUserByBookingId(bookingId), HttpStatus.OK);
    }

}
