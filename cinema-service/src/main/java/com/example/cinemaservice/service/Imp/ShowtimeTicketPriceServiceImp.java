package com.example.cinemaservice.service.Imp;

import com.example.cinemaservice.dtos.ShowtimeTicketPriceDTO;
import com.example.cinemaservice.entity.ShowtimeTicketPrice;

import java.util.List;
import java.util.Optional;

public interface ShowtimeTicketPriceServiceImp {

    public ShowtimeTicketPrice create(ShowtimeTicketPrice entity);

    public Optional<ShowtimeTicketPrice> getById(Integer id);

    public List<ShowtimeTicketPrice> getAll();

    public ShowtimeTicketPrice update(Integer id, ShowtimeTicketPrice entity);

    public void delete(Integer id);

    public ShowtimeTicketPriceDTO getByShowTimeIdAndTicketType(int  showTimeId, int ticketTypeId);
}
