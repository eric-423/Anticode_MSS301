package com.example.cinemaservice.service.Imp;

import com.example.cinemaservice.entity.TicketType;

import java.util.List;
import java.util.Optional;

public interface TicketTypeServiceImp {

    public TicketType create(TicketType entity);

    public Optional<TicketType> getById(Integer id);

    public List<TicketType> getAll();

    public TicketType update(Integer id, TicketType entity);

    public void delete(Integer id);
}
