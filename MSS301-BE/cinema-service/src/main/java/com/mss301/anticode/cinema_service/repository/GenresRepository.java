package com.mss301.anticode.cinema_service.repository;

import com.mss301.anticode.cinema_service.entity.Genres;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenresRepository extends JpaRepository<Genres, Integer> {
}
