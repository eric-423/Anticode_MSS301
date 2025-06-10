package com.mss301.anticode.cinema_service.service.Imp;

import com.mss301.anticode.cinema_service.entity.FilmPersonel;
import com.mss301.anticode.cinema_service.repository.FirmPersonelRepository;

import java.util.List;
import java.util.Optional;

public interface FilmPersonelServiceImp {

    public FilmPersonel create(FilmPersonel entity);

    public Optional<FilmPersonel> getById(Integer id);

    public List<FilmPersonel> getAll();

    public FilmPersonel update(Integer id, FilmPersonel entity);

    public void delete(Integer id);
}
