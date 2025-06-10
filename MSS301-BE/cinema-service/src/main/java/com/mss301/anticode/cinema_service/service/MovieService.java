package com.mss301.anticode.cinema_service.service;

import com.mss301.anticode.cinema_service.entity.Movie;
import com.mss301.anticode.cinema_service.repository.MovieRepository;
import com.mss301.anticode.cinema_service.service.Imp.MovieServiceImp;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService implements MovieServiceImp {
    private final MovieRepository repository;

    public MovieService(MovieRepository repository) {
        this.repository = repository;
    }

    @Override
    public Movie create(Movie entity) {
        return repository.save(entity);
    }

    @Override
    public Optional<Movie> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public List<Movie> getAll() {
        return repository.findAll();
    }

    @Override
    public Movie update(Integer id, Movie entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Movie not found: " + id);
        }
        entity.setId(id);
        return repository.save(entity);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
