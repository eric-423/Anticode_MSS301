package com.mss301.anticode.cinema_service.service.Imp;

import com.mss301.anticode.cinema_service.entity.CinemaHall;
import com.mss301.anticode.cinema_service.repository.CinemaHallRepository;

import java.util.List;
import java.util.Optional;

public interface CinemaHallServiceImp {

    public CinemaHall create(CinemaHall entity);

    public Optional<CinemaHall> getById(Integer id);

    public List<CinemaHall> getAll();

    public CinemaHall update(Integer id, CinemaHall entity);

    public void delete(Integer id);
}
