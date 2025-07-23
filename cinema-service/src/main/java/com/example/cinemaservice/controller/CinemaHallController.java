package com.example.cinemaservice.controller;

import com.example.cinemaservice.dtos.CinemaHallsDTO;
import com.example.cinemaservice.entity.CinemaHall;
import com.example.cinemaservice.service.Imp.CinemaHallServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cinema-halls")
public class CinemaHallController {

    @Autowired
    private CinemaHallServiceImp cinemaHallServiceImp;

    @GetMapping
    public List<CinemaHallsDTO> getAllCinemaHalls() {
        return cinemaHallServiceImp.getAll();
    }

    @GetMapping("/{id}")
    public CinemaHall getCinemaHallById(@PathVariable Integer id) {
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
