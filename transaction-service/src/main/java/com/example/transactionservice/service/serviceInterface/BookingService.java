package com.example.transactionservice.service.serviceInterface;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "booking-service", url = "${booking.service.url}")
public interface BookingService {
    @GetMapping("/dashboard/user-by-booking-id/{bookingId}")
    public Integer getUserByBookingId(@PathVariable int bookingId);
}
