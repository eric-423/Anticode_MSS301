package com.example.cinemaservice.service;

import com.example.cinemaservice.dtos.ShowTimeDTO;
import com.example.cinemaservice.dtos.ShowtimeTicketPriceDTO;
import com.example.cinemaservice.entity.ShowtimeTicketPrice;
import com.example.cinemaservice.repository.ShowtimeTicketPriceRepository;
import com.example.cinemaservice.service.Imp.ShowtimeTicketPriceServiceImp;
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

    @Override
    public ShowtimeTicketPriceDTO getByShowTimeIdAndTicketType(int  showTimeId, int ticketTypeId) {


        ShowtimeTicketPrice showtimeTicketPrice = repository.findByShowtime_IdAndTicketType_Id(showTimeId,ticketTypeId);
        ShowtimeTicketPriceDTO showtimeTicketPriceDTO = new ShowtimeTicketPriceDTO();
        showtimeTicketPriceDTO.setId(showtimeTicketPrice.getId());
        showtimeTicketPriceDTO.setTicketPrice(showtimeTicketPrice.getTicketPrice());

        return showtimeTicketPriceDTO;
    }
}
