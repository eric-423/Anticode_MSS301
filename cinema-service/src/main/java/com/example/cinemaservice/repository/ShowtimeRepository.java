package com.example.cinemaservice.repository;

import com.example.cinemaservice.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Integer> {
    List<Showtime> findByMovieId(int movieId);


    List<Showtime> getShowtimesByMovie_Id(int movieId);
}
