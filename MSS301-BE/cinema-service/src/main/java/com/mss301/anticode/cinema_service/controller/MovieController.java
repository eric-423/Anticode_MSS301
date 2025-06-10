package com.mss301.anticode.cinema_service.controller;

import com.mss301.anticode.cinema_service.entity.Movie;
import com.mss301.anticode.cinema_service.service.Imp.MovieServiceImp;
import com.mss301.anticode.cinema_service.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/movies")
public class MovieController {
    @Autowired
    private MovieServiceImp movieServiceImp;

    @GetMapping
    public Iterable<Movie> getAllMovies() {
        return movieServiceImp.getAll();
    }

    @GetMapping("/{id}")
    public Movie getMovieById(Integer id) {
        return movieServiceImp.getById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found with id: " + id));
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
