package com.mss301.anticode.cinema_service.controller;

import com.mss301.anticode.cinema_service.entity.Genres;
import com.mss301.anticode.cinema_service.service.GenresService;
import com.mss301.anticode.cinema_service.service.Imp.GenresServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/genres")
public class GenresController {
    @Autowired
    private GenresServiceImp genresServiceImp;

    @GetMapping
    public Iterable<Genres> getAllGenres() {
        return genresServiceImp.getAll();
    }

    @GetMapping("/{id}")
    public Genres getGenreById(Integer id) {
        return genresServiceImp.getById(id)
                .orElseThrow(() -> new RuntimeException("Genre not found with id: " + id));
    }

    @PostMapping
    public Genres createGenre(Genres genre) {
        return genresServiceImp.create(genre);
    }

    @PutMapping("/{id}")
    public Genres updateGenre(Integer id, Genres genre) {
        return genresServiceImp.update(id, genre);
    }

    @DeleteMapping("/{id}")
    public void deleteGenre(Integer id) {
        genresServiceImp.delete(id);
    }
}
