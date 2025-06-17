package com.example.cinemaservice.controller;

import com.example.cinemaservice.entity.Showtime;
import com.example.cinemaservice.service.Imp.ShowtimeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/showtimes")
public class ShowtimeController {
    @Autowired
    private ShowtimeServiceImp showtimeServiceImp;

    @GetMapping
    public Iterable<Showtime> getAllShowtimes() {
        return showtimeServiceImp.getAll();
    }

    @GetMapping("/{id}")
    public Showtime getShowtimeById(Integer id) {
        return showtimeServiceImp.getById(id)
                .orElseThrow(() -> new RuntimeException("Showtime not found with id: " + id));
    }

    @PostMapping
    public Showtime createShowtime(Showtime showtime) {
        return showtimeServiceImp.create(showtime);
    }

    @PutMapping("/{id}")
    public Showtime updateShowtime(Integer id, Showtime showtime) {
        return showtimeServiceImp.update(id, showtime);
    }

    @DeleteMapping("/{id}")
    public void deleteShowtime(Integer id) {
        showtimeServiceImp.delete(id);
    }
}
