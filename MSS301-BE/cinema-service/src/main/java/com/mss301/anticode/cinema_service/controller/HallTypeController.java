package com.mss301.anticode.cinema_service.controller;

import com.mss301.anticode.cinema_service.entity.HallType;
import com.mss301.anticode.cinema_service.service.HallTypeService;
import com.mss301.anticode.cinema_service.service.Imp.HallTypeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hall-types")
public class HallTypeController {
    @Autowired
    private HallTypeServiceImp hallTypeServiceImp;

    @GetMapping
    public Iterable<HallType> getAllHallTypes() {
        return hallTypeServiceImp.getAll();
    }

    @GetMapping("/{id}")
    public HallType getHallTypeById(Integer id) {
        return hallTypeServiceImp.getById(id)
                .orElseThrow(() -> new RuntimeException("Hall Type not found with id: " + id));
    }

    @PostMapping("/create")
    public HallType createHallType(HallType hallType) {
        return hallTypeServiceImp.create(hallType);
    }

    @PutMapping("/update/{id}")
    public HallType updateHallType(Integer id, HallType hallType) {
        return hallTypeServiceImp.update(id, hallType);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteHallType(Integer id) {
        hallTypeServiceImp.delete(id);
    }
}
