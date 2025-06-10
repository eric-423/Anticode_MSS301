package com.mss301.anticode.cinema_service.service;

import com.mss301.anticode.cinema_service.entity.Genres;
import com.mss301.anticode.cinema_service.repository.GenresRepository;
import com.mss301.anticode.cinema_service.service.Imp.GenresServiceImp;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GenresService implements GenresServiceImp {
    private final GenresRepository repository;

    public GenresService(GenresRepository repository) {
        this.repository = repository;
    }

    @Override
    public Genres create(Genres entity) {
        return repository.save(entity);
    }

    @Override
    public Optional<Genres> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public List<Genres> getAll() {
        return repository.findAll();
    }

    @Override
    public Genres update(Integer id, Genres entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Genres not found: " + id);
        }
        entity.setId(id);
        return repository.save(entity);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
