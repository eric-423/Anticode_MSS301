package com.mss301.anticode.cinema_service.service;

import com.mss301.anticode.cinema_service.entity.CinemaHall;
import com.mss301.anticode.cinema_service.repository.CinemaHallRepository;
import com.mss301.anticode.cinema_service.service.Imp.CinemaHallServiceImp;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CinemaHallService implements CinemaHallServiceImp {
    private final CinemaHallRepository repository;

    public CinemaHallService(CinemaHallRepository repository) {
        this.repository = repository;
    }

    @Override
    public CinemaHall create(CinemaHall entity) {
        return repository.save(entity);
    }

    @Override
    public Optional<CinemaHall> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public List<CinemaHall> getAll() {
        return repository.findAll();
    }

    @Override
    public CinemaHall update(Integer id, CinemaHall entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("CinemaHall not found: " + id);
        }
        entity.setId(id);
        return repository.save(entity);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
