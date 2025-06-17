package com.example.cinemaservice.repository;

import com.example.cinemaservice.entity.Genres;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenresRepository extends JpaRepository<Genres, Integer> {
}
