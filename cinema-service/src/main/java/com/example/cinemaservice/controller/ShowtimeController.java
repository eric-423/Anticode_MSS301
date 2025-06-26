package com.example.cinemaservice.controller;

import com.example.cinemaservice.dtos.ShowTimeDTO;
import com.example.cinemaservice.entity.Showtime;
import com.example.cinemaservice.payload.ResponseData;
import com.example.cinemaservice.service.Imp.ShowtimeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/showtimes")
public class ShowtimeController {
    @Autowired
    private ShowtimeServiceImp showtimeServiceImp;

    @GetMapping
    public ResponseEntity<?> getAllShowtimes() {
        return new ResponseEntity<>(showtimeServiceImp.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getShowtimeById(@PathVariable int id) {
        ResponseData responseData = new ResponseData();
        responseData.setData(showtimeServiceImp.getById(id));
        return ResponseEntity.ok(responseData);
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

    @GetMapping("/movie/{movieId}")
    public ResponseEntity<?> getShowTimeDateByMovieId(@PathVariable Integer movieId) {
        try {
            ResponseData responseData = new ResponseData();
            responseData.setData(showtimeServiceImp.getShowTimeDateByMovieId(movieId));
            return ResponseEntity.ok(responseData);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error retrieving showtimes for movie ID: " + movieId);
        }
    }

    @GetMapping("/movie/show-time-date/{movieId}")
    public ResponseEntity<?> getShowTimeByDate(@RequestParam String date, @PathVariable Integer movieId) {
        try {
            ResponseData responseData = new ResponseData();
            responseData.setData(showtimeServiceImp.getShowtimeByDate(date, movieId));
            return ResponseEntity.ok(responseData);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error retrieving showtimes for date: " + date);
        }
    }
}
