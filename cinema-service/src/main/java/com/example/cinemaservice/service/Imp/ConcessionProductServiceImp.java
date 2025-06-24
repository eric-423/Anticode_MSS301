package com.example.cinemaservice.service.Imp;

import com.example.cinemaservice.dtos.ConcessionProductDTO;
import com.example.cinemaservice.entity.ConcessionProduct;
import org.springframework.data.domain.Page;

public interface ConcessionProductServiceImp {
    public ConcessionProduct create(ConcessionProduct entity);

    public ConcessionProductDTO getById(Integer id);

    public Page<ConcessionProductDTO> getAll(int page, int size);

    public ConcessionProduct update(Integer id, ConcessionProduct entity);

    public void delete(Integer id);
}
