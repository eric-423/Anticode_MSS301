package com.mss301.anticode.cinema_service.service.Imp;

import com.mss301.anticode.cinema_service.entity.ConcessionProduct;

import java.util.List;
import java.util.Optional;

public interface ConcessionProductServiceImp {
    public ConcessionProduct create(ConcessionProduct entity);

    public Optional<ConcessionProduct> getById(Integer id);

    public List<ConcessionProduct> getAll();

    public ConcessionProduct update(Integer id, ConcessionProduct entity);

    public void delete(Integer id);
}
