package com.spring.bookingservice.services;

import com.spring.bookingservice.dtos.ShowTimeDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "cinema-service", url = "${cinema.service.url}")
public interface ShowTimeService {
    @GetMapping("showtimes/transfer/{id}")
    public ShowTimeDTO getShowtimeByIdTransfer(@PathVariable int id);
}
