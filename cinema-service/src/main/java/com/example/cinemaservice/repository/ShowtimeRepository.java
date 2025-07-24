package com.example.cinemaservice.repository;

import com.example.cinemaservice.entity.CinemaHall;
import com.example.cinemaservice.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Integer> {
    List<Showtime> findByMovieId(int movieId);


    List<Showtime> getShowtimesByMovie_Id(int movieId);

    Showtime getShowtimesById(int id);

    List<Showtime> getShowtimesByCinemaHall_Id(int cinemaHallId);

    List<Showtime> findByCinemaHallAndStartTimeBeforeAndEndTimeAfter(CinemaHall cinemaHall, Date endTime, Date startTime);

    @Query("SELECT s FROM Showtime s WHERE s.cinemaHall.id = :cinemaHallId AND s.startTime < :endTime AND s.endTime > :startTime")
    List<Showtime> findConflictingShowtimes(@Param("cinemaHallId") Integer cinemaHallId, @Param("startTime") Date startTime, @Param("endTime") Date endTime);
}
