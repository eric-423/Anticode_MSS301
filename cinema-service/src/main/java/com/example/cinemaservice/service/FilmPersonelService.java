package com.example.cinemaservice.service;

import com.example.cinemaservice.entity.FilmPersonel;
import com.example.cinemaservice.repository.FirmPersonelRepository;
import com.example.cinemaservice.service.Imp.FilmPersonelServiceImp;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FilmPersonelService  implements FilmPersonelServiceImp {
    private final FirmPersonelRepository repository;

    public FilmPersonelService(FirmPersonelRepository repository) {
        this.repository = repository;
    }

    @Override
    public FilmPersonel create(FilmPersonel entity) {
        return repository.save(entity);
    }

    @Override
    public Optional<FilmPersonel> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public List<FilmPersonel> getAll() {
        return repository.findAll();
    }

    @Override
    public FilmPersonel update(Integer id, FilmPersonel entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("FilmPersonel not found: " + id);
        }
        entity.setId(id);
        return repository.save(entity);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
