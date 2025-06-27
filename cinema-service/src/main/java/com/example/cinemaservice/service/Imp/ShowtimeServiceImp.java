package com.example.cinemaservice.service.Imp;

import com.example.cinemaservice.dtos.ShowTimeDTO;
import com.example.cinemaservice.entity.Showtime;

import java.util.Date;
import java.util.List;

public interface ShowtimeServiceImp {

    public Showtime create(Showtime entity);

    public ShowTimeDTO getById(Integer id);

    public List<ShowTimeDTO> getAll();

    List<ShowTimeDTO> findByMovieId(int movieId);

    public Showtime update(Integer id, Showtime entity);

    public void delete(Integer id);

    List<Date> getShowTimeDateByMovieId(int movieId);

    public List<ShowTimeDTO> getShowtimeByDate(String inputDateStr, int movieId);
}
