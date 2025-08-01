package com.example.cinemaservice.controller;

import com.example.cinemaservice.entity.FilmPersonel;
import com.example.cinemaservice.service.Imp.FilmPersonelServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/film-personels")
public class FilmPersonelController {
    @Autowired
    private FilmPersonelServiceImp filmPersonelServiceImp;

    @GetMapping
    public Iterable<FilmPersonel> getAllFilmPersonels() {
        return filmPersonelServiceImp.getAll();
    }

    @GetMapping("/{id}")
    public FilmPersonel getFilmPersonelById(Integer id) {
        return filmPersonelServiceImp.getById(id)
                .orElseThrow(() -> new RuntimeException("Film Personel not found with id: " + id));
    }

    @PostMapping
    public FilmPersonel createFilmPersonel(FilmPersonel filmPersonel) {
        return filmPersonelServiceImp.create(filmPersonel);
    }

    @PutMapping("/{id}")
    public FilmPersonel updateFilmPersonel(Integer id, FilmPersonel filmPersonel) {
        return filmPersonelServiceImp.update(id, filmPersonel);
    }

    @DeleteMapping("/{id}")
    public void deleteFilmPersonel(Integer id) {
        filmPersonelServiceImp.delete(id);
    }
}
