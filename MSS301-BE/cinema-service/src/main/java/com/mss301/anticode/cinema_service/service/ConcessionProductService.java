package com.mss301.anticode.cinema_service.service;

import com.mss301.anticode.cinema_service.entity.ConcessionProduct;
import com.mss301.anticode.cinema_service.repository.ConcessionProductRepository;
import com.mss301.anticode.cinema_service.service.Imp.ConcessionProductServiceImp;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConcessionProductService implements ConcessionProductServiceImp {
    private final ConcessionProductRepository repository;

    public ConcessionProductService(ConcessionProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public ConcessionProduct create(ConcessionProduct entity) {
        return repository.save(entity);
    }

    @Override
    public Optional<ConcessionProduct> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public List<ConcessionProduct> getAll() {
        return repository.findAll();
    }

    @Override
    public ConcessionProduct update(Integer id, ConcessionProduct entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("ConcessionProduct not found: " + id);
        }
        entity.setId(id);
        return repository.save(entity);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
