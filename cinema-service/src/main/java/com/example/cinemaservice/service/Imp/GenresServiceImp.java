package com.example.cinemaservice.service.Imp;

import com.example.cinemaservice.entity.Genres;

import java.util.List;
import java.util.Optional;

public interface GenresServiceImp {
    public Genres create(Genres entity);

    public Optional<Genres> getById(Integer id);

    public List<Genres> getAll();

    public Genres update(Integer id, Genres entity);

    public void delete(Integer id);
}
