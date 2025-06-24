package com.example.cinemaservice.service;

import com.example.cinemaservice.entity.TicketType;
import com.example.cinemaservice.repository.TicketTypeRepository;
import com.example.cinemaservice.service.Imp.TicketTypeServiceImp;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketTypeService implements TicketTypeServiceImp {
    private final TicketTypeRepository repository;

    public TicketTypeService(TicketTypeRepository repository) {
        this.repository = repository;
    }

    @Override
    public TicketType create(TicketType entity) {
        return repository.save(entity);
    }

    @Override
    public Optional<TicketType> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public List<TicketType> getAll() {
        return repository.findAll();
    }

    @Override
    public TicketType update(Integer id, TicketType entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("TicketType not found: " + id);
        }
        entity.setId(id);
        return repository.save(entity);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
