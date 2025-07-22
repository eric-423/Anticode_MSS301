package com.example.cinemaservice.controller;

import com.example.cinemaservice.dtos.MovieDTO;
import com.example.cinemaservice.entity.Movie;
import com.example.cinemaservice.payload.ResponseData;
import com.example.cinemaservice.service.Imp.MovieServiceImp;
import com.example.cinemaservice.service.Imp.ShowtimeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/movies")
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
    public ResponseEntity<?> getMovieById(@PathVariable("id") Integer id) {
        ResponseData responseData = new ResponseData();
        responseData.setData(movieServiceImp.getById(id));

        return ResponseEntity.ok(responseData);
    }

    @GetMapping("/get-movie-by-showtime-id/{showtimeID}")
    public ResponseEntity<MovieDTO> getMovieByShowtimeID(@PathVariable("showtimeID") int showtimeID){
        return new ResponseEntity<>(movieServiceImp.getMovieByShowtimeID(showtimeID), HttpStatus.OK);
    }

    @GetMapping("/get/{ticketId}")
    public ResponseEntity<MovieDTO> getMovieByTicket(@PathVariable("ticketId") Integer ticketId) {
        return ResponseEntity.ok(movieServiceImp.getByTicketId(ticketId));
    }

    @GetMapping("/{id}/showtimes")
    public ResponseEntity<?> getShowtimesByMovie(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(showtimeServiceImp.findByMovieId(id), HttpStatus.OK);
    }

    @PostMapping("/create")
    public Movie createMovie(@RequestBody Movie movie) {
        return movieServiceImp.create(movie);
    }

    @PutMapping("/update/{id}")
    public Movie updateMovie(@PathVariable Integer id, @RequestBody Movie movie) {
        return movieServiceImp.update(id, movie);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteMovie(@PathVariable Integer id) {
        movieServiceImp.delete(id);
    }


}
