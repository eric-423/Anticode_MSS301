package com.example.cinemaservice.service.Imp;

import com.example.cinemaservice.dtos.CinemaHallsDTO;
import com.example.cinemaservice.entity.CinemaHall;

import java.util.List;
import java.util.Optional;

public interface CinemaHallServiceImp {

    public CinemaHall create(CinemaHall entity);

    public Optional<CinemaHall> getById(Integer id);

    public List<CinemaHallsDTO> getAll();

    public CinemaHall update(Integer id, CinemaHall entity);

    public void delete(Integer id);

    public List<CinemaHallsDTO> getAllWithShowtimes();
}
