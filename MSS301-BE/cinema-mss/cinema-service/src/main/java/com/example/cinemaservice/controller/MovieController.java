package com.example.cinemaservice.controller;

import com.example.cinemaservice.entity.Movie;
import com.example.cinemaservice.entity.enums.MovieStatus;
import com.example.cinemaservice.service.Imp.MovieServiceImp;
import com.example.cinemaservice.service.Imp.ShowtimeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/movies")
@CrossOrigin
public class MovieController {
    @Autowired
    private MovieServiceImp movieServiceImp;

    @Autowired
    private ShowtimeServiceImp showtimeServiceImp;

    @GetMapping
    public Iterable<Movie> getAllMovies(@RequestParam(value = "status", required = false) MovieStatus status) {
        if (status != null) {
            return movieServiceImp.getByStatus(status);
        }
        return movieServiceImp.getAll();
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
