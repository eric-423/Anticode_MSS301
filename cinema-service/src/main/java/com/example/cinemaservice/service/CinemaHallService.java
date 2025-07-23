package com.example.cinemaservice.service;

import com.example.cinemaservice.dtos.CinemaHallsDTO;
import com.example.cinemaservice.dtos.HallTypeDTO;
import com.example.cinemaservice.entity.CinemaHall;
import com.example.cinemaservice.repository.CinemaHallRepository;
import com.example.cinemaservice.service.Imp.CinemaHallServiceImp;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CinemaHallService implements CinemaHallServiceImp {
    private final CinemaHallRepository repository;

    public CinemaHallService(CinemaHallRepository repository) {
        this.repository = repository;
    }

    @Override
    public CinemaHall create(CinemaHall entity) {
        return repository.save(entity);
    }

    @Override
    public Optional<CinemaHall> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public List<CinemaHallsDTO> getAll() {
        List<CinemaHall> cinemaHalls = repository.findAll();
        List<CinemaHallsDTO> result = new ArrayList<>();
        for(CinemaHall cinemaHall : cinemaHalls) {
            CinemaHallsDTO dto = new CinemaHallsDTO();
            dto.setId(cinemaHall.getId());
            dto.setHallName(cinemaHall.getHallName());
            dto.setScrrenType(cinemaHall.getScrrenType());
            HallTypeDTO hallTypeDTO = new HallTypeDTO();
            hallTypeDTO.setId(cinemaHall.getHallType().getId());
            hallTypeDTO.setName(cinemaHall.getHallType().getName());
            hallTypeDTO.setRoll(cinemaHall.getHallType().getRoll());
            hallTypeDTO.setColumn(cinemaHall.getHallType().getColumn());
            dto.setHallType(hallTypeDTO);
            result.add(dto);
        }
        return result;
    }

    @Override
    public CinemaHall update(Integer id, CinemaHall entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("CinemaHall not found: " + id);
        }
        entity.setId(id);
        return repository.save(entity);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
