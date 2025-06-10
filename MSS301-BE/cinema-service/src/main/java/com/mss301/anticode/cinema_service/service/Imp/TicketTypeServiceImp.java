package com.mss301.anticode.cinema_service.service.Imp;

import com.mss301.anticode.cinema_service.entity.TicketType;

import java.util.List;
import java.util.Optional;

public interface TicketTypeServiceImp {

    public TicketType create(TicketType entity);

    public Optional<TicketType> getById(Integer id);

    public List<TicketType> getAll();

    public TicketType update(Integer id, TicketType entity);

    public void delete(Integer id);
}
