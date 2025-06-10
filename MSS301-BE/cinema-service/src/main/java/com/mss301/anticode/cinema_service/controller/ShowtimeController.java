package com.mss301.anticode.cinema_service.controller;

import com.mss301.anticode.cinema_service.entity.Showtime;
import com.mss301.anticode.cinema_service.service.Imp.ShowtimeServiceImp;
import com.mss301.anticode.cinema_service.service.ShowtimeService;
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
