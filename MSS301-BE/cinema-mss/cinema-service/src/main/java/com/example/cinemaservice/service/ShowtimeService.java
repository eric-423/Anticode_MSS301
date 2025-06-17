package com.example.cinemaservice.service;

import com.example.cinemaservice.entity.Showtime;
import com.example.cinemaservice.repository.ShowtimeRepository;
import com.example.cinemaservice.service.Imp.ShowtimeServiceImp;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShowtimeService implements ShowtimeServiceImp {
    private final ShowtimeRepository repository;

    public ShowtimeService(ShowtimeRepository repository) {
        this.repository = repository;
    }

    @Override
    public Showtime create(Showtime entity) {
        return repository.save(entity);
    }

    @Override
    public Optional<Showtime> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public List<Showtime> getAll() {
        return repository.findAll();
    }

    @Override
    public List<Showtime> findByMovieId(int movieId) {
        return repository.findByMovieId(movieId);
    }

    @Override
    public Showtime update(Integer id, Showtime entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Showtime not found: " + id);
        }
        entity.setId(id);
        return repository.save(entity);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
