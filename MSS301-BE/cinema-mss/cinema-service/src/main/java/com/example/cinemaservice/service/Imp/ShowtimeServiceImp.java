package com.example.cinemaservice.service.Imp;

import com.example.cinemaservice.entity.Showtime;

import java.util.List;
import java.util.Optional;

public interface ShowtimeServiceImp {

    public Showtime create(Showtime entity);

    public Optional<Showtime> getById(Integer id);

    public List<Showtime> getAll();

    List<Showtime> findByMovieId(int movieId);

    public Showtime update(Integer id, Showtime entity);

    public void delete(Integer id);
}
