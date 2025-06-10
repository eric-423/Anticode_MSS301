package com.mss301.anticode.cinema_service.service.Imp;

import com.mss301.anticode.cinema_service.entity.Genres;

import java.util.List;
import java.util.Optional;

public interface GenresServiceImp {
    public Genres create(Genres entity);

    public Optional<Genres> getById(Integer id);

    public List<Genres> getAll();

    public Genres update(Integer id, Genres entity);

    public void delete(Integer id);
}
