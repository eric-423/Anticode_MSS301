package com.mss301.anticode.cinema_service.service.Imp;

import com.mss301.anticode.cinema_service.entity.Movie;

import java.util.List;
import java.util.Optional;

public interface MovieServiceImp {

    public Movie create(Movie entity);

    public Optional<Movie> getById(Integer id);

    public List<Movie> getAll();

    public Movie update(Integer id, Movie entity);

    public void delete(Integer id);
}
