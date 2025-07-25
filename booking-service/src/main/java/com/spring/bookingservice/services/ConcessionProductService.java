package com.spring.bookingservice.services;

import com.spring.bookingservice.dtos.ConcessionProductDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "cinema-service", url = "${cinema.service.url}")
public interface ConcessionProductService {
    @GetMapping("concession-products/booking/{id}")
    ConcessionProductDTO getConcessionProductByIdForBooking(@PathVariable Integer id);
}
