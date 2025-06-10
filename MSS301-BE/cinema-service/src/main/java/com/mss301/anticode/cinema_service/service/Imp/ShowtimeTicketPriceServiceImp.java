package com.mss301.anticode.cinema_service.service.Imp;

import com.mss301.anticode.cinema_service.entity.ShowtimeTicketPrice;
import com.mss301.anticode.cinema_service.repository.ShowtimeTicketPriceRepository;

import java.util.List;
import java.util.Optional;

public interface ShowtimeTicketPriceServiceImp {

    public ShowtimeTicketPrice create(ShowtimeTicketPrice entity);

    public Optional<ShowtimeTicketPrice> getById(Integer id);

    public List<ShowtimeTicketPrice> getAll();

    public ShowtimeTicketPrice update(Integer id, ShowtimeTicketPrice entity);

    public void delete(Integer id);
}
