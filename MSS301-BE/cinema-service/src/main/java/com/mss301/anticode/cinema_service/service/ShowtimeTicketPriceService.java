package com.mss301.anticode.cinema_service.service;

import com.mss301.anticode.cinema_service.entity.ShowtimeTicketPrice;
import com.mss301.anticode.cinema_service.repository.ShowtimeTicketPriceRepository;
import com.mss301.anticode.cinema_service.service.Imp.ShowtimeTicketPriceServiceImp;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShowtimeTicketPriceService implements ShowtimeTicketPriceServiceImp {
    private final ShowtimeTicketPriceRepository repository;

    public ShowtimeTicketPriceService(ShowtimeTicketPriceRepository repository) {
        this.repository = repository;
    }

    @Override
    public ShowtimeTicketPrice create(ShowtimeTicketPrice entity) {
        return repository.save(entity);
    }

    @Override
    public Optional<ShowtimeTicketPrice> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public List<ShowtimeTicketPrice> getAll() {
        return repository.findAll();
    }

    @Override
    public ShowtimeTicketPrice update(Integer id, ShowtimeTicketPrice entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("ShowtimeTicketPrice not found: " + id);
        }
        entity.setId(id);
        return repository.save(entity);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
