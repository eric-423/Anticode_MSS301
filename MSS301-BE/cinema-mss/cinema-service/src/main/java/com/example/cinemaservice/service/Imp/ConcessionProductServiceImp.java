package com.example.cinemaservice.service.Imp;

import com.example.cinemaservice.entity.ConcessionProduct;

import java.util.List;
import java.util.Optional;

public interface ConcessionProductServiceImp {
    public ConcessionProduct create(ConcessionProduct entity);

    public Optional<ConcessionProduct> getById(Integer id);

    public List<ConcessionProduct> getAll();

    public ConcessionProduct update(Integer id, ConcessionProduct entity);

    public void delete(Integer id);
}
