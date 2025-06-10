package com.mss301.anticode.cinema_service.service.Imp;

import com.mss301.anticode.cinema_service.entity.Showtime;

import java.util.List;
import java.util.Optional;

public interface ShowtimeServiceImp {

    public Showtime create(Showtime entity);

    public Optional<Showtime> getById(Integer id);

    public List<Showtime> getAll();

    public Showtime update(Integer id, Showtime entity);

    public void delete(Integer id);
}
