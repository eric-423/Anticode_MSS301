package com.example.cinemaservice.service.Imp;

import com.example.cinemaservice.entity.FilmPersonel;

import java.util.List;
import java.util.Optional;

public interface FilmPersonelServiceImp {

    public FilmPersonel create(FilmPersonel entity);

    public Optional<FilmPersonel> getById(Integer id);

    public List<FilmPersonel> getAll();

    public FilmPersonel update(Integer id, FilmPersonel entity);

    public void delete(Integer id);
}
