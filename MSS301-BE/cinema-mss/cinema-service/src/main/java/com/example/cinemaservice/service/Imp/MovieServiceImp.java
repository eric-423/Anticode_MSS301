package com.example.cinemaservice.service.Imp;

import com.example.cinemaservice.entity.Movie;
import com.example.cinemaservice.entity.enums.MovieStatus;

import java.util.List;
import java.util.Optional;

public interface MovieServiceImp {

    public Movie create(Movie entity);

    public Optional<Movie> getById(Integer id);

    public List<Movie> getAll();

    List<Movie> getByStatus(MovieStatus status);

    public Movie update(Integer id, Movie entity);

    public void delete(Integer id);
}
