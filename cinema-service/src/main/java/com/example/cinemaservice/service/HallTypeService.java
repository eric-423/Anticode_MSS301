package com.example.cinemaservice.service;

import com.example.cinemaservice.entity.HallType;
import com.example.cinemaservice.repository.HallTypeRepository;
import com.example.cinemaservice.service.Imp.HallTypeServiceImp;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HallTypeService implements HallTypeServiceImp {
    private final HallTypeRepository repository;

    public HallTypeService(HallTypeRepository repository) {
        this.repository = repository;
    }

    @Override
    public HallType create(HallType entity) {
        return repository.save(entity);
    }

    @Override
    public Optional<HallType> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public List<HallType> getAll() {
        return repository.findAll();
    }

    @Override
    public HallType update(Integer id, HallType entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("HallType not found: " + id);
        }
        entity.setId(id);
        return repository.save(entity);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
