package com.example.cinemaservice.controller;

import com.example.cinemaservice.entity.Movie;
import com.example.cinemaservice.entity.enums.MovieStatus;
import com.example.cinemaservice.payload.ResponseData;
import com.example.cinemaservice.service.Imp.MovieServiceImp;
import com.example.cinemaservice.service.Imp.ShowtimeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "*", maxAge = 3600)
public class MovieController {
    @Autowired
    private MovieServiceImp movieServiceImp;

    @Autowired
    private ShowtimeServiceImp showtimeServiceImp;

    @GetMapping
    public ResponseEntity<?> getAllMovies(@RequestParam(value = "status", required = false) String status, @RequestParam(value = "page", defaultValue = "0") int page, @RequestParam(value = "size", defaultValue = "10") int size) {

        ResponseData responseData = new ResponseData();
        responseData.setData(movieServiceImp.getByStatus(status, page, size));
        responseData.setStatus(200);
        responseData.setDesc("Movies retrieved successfully");

        return ResponseEntity.ok(responseData);
    }

    @GetMapping("/{id}")
    public Movie getMovieById(@PathVariable("id") Integer id) {
        return movieServiceImp.getById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found with id: " + id));
    }

    @GetMapping("/{id}/showtimes")
    public Iterable<?> getShowtimesByMovie(@PathVariable("id") Integer id) {
        return showtimeServiceImp.findByMovieId(id);
    }

    @PostMapping("/create")
    public Movie createMovie(Movie movie) {
        return movieServiceImp.create(movie);
    }

    @PutMapping("/update/{id}")
    public Movie updateMovie(Integer id, Movie movie) {
        return movieServiceImp.update(id, movie);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteMovie(Integer id) {
        movieServiceImp.delete(id);
    }


}
