package com.example.cinemaservice.service.Imp;

import com.example.cinemaservice.dtos.MovieDTO;
import com.example.cinemaservice.entity.Movie;
import org.springframework.data.domain.Page;

import java.util.List;

public interface MovieServiceImp {

    public Movie create(Movie entity);

    public MovieDTO getById(Integer id);

    public List<Movie> getAll();

    Page<MovieDTO> getByStatus(String status, int page, int size);

    public Movie update(Integer id, Movie entity);

    public void delete(Integer id);

    MovieDTO getByTicketId(Integer ticketId);

    public MovieDTO getMovieByShowtimeID(int showtimeID);
}
