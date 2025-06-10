package com.mss301.anticode.cinema_service.service.Imp;

import com.mss301.anticode.cinema_service.entity.HallType;

import java.util.List;
import java.util.Optional;

public interface HallTypeServiceImp {

    public HallType create(HallType entity);

    public Optional<HallType> getById(Integer id);

    public List<HallType> getAll();

    public HallType update(Integer id, HallType entity);

    public void delete(Integer id);
}
