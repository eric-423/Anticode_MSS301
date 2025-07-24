package com.example.cinemaservice.repository;

import com.example.cinemaservice.entity.CinemaHall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CinemaHallRepository extends JpaRepository<CinemaHall, Integer> {

    @Query("SELECT ch FROM CinemaHall ch left join fetch ch.showtimes")
    List<CinemaHall> findAllWithShowtimes();
}
