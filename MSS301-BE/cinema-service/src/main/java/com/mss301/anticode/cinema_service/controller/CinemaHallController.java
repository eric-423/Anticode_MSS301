package com.mss301.anticode.cinema_service.controller;

import com.mss301.anticode.cinema_service.entity.CinemaHall;
import com.mss301.anticode.cinema_service.service.CinemaHallService;
import com.mss301.anticode.cinema_service.service.Imp.CinemaHallServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.service.annotation.PutExchange;

@RestController
@RequestMapping("/cinema-halls")
public class CinemaHallController {

    @Autowired
    private CinemaHallServiceImp cinemaHallServiceImp;

    @GetMapping
    public Iterable<CinemaHall> getAllCinemaHalls() {
        return cinemaHallServiceImp.getAll();
    }

    @GetMapping("/{id}")
    public CinemaHall getCinemaHallById(Integer id) {
        return cinemaHallServiceImp.getById(id)
                .orElseThrow(() -> new RuntimeException("Cinema Hall not found with id: " + id));
    }

    @PostMapping
    public CinemaHall createCinemaHall(CinemaHall cinemaHall) {
        return cinemaHallServiceImp.create(cinemaHall);
    }

    @PutMapping("/{id}")
    public CinemaHall updateCinemaHall(Integer id, CinemaHall cinemaHall) {
        return cinemaHallServiceImp.update(id, cinemaHall);
    }

    @DeleteMapping("/{id}")
    public void deleteCinemaHall(Integer id) {
        cinemaHallServiceImp.delete(id);
    }


}
