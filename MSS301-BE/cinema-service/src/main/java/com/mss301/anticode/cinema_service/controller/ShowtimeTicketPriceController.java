package com.mss301.anticode.cinema_service.controller;

import com.mss301.anticode.cinema_service.entity.ShowtimeTicketPrice;
import com.mss301.anticode.cinema_service.service.Imp.ShowtimeTicketPriceServiceImp;
import com.mss301.anticode.cinema_service.service.ShowtimeTicketPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/showtime-ticket-prices")
public class ShowtimeTicketPriceController {
    @Autowired
    private ShowtimeTicketPriceServiceImp showtimeTicketPriceServiceImp;

    @GetMapping
    public Iterable<ShowtimeTicketPrice> getAllShowtimeTicketPrices() {
        return showtimeTicketPriceServiceImp.getAll();
    }

    @GetMapping("/{id}")
    public ShowtimeTicketPrice getShowtimeTicketPriceById(Integer id) {
        return showtimeTicketPriceServiceImp.getById(id)
                .orElseThrow(() -> new RuntimeException("Showtime Ticket Price not found with id: " + id));
    }

    @PostMapping
    public ShowtimeTicketPrice createShowtimeTicketPrice(ShowtimeTicketPrice showtimeTicketPrice) {
        return showtimeTicketPriceServiceImp.create(showtimeTicketPrice);
    }

    @PutMapping("/{id}")
    public ShowtimeTicketPrice updateShowtimeTicketPrice(Integer id, ShowtimeTicketPrice showtimeTicketPrice) {
        return showtimeTicketPriceServiceImp.update(id, showtimeTicketPrice);
    }

    @DeleteMapping("/{id}")
    public void deleteShowtimeTicketPrice(Integer id) {
        showtimeTicketPriceServiceImp.delete(id);
    }
}
