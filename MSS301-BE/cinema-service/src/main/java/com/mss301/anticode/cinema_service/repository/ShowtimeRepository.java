package com.mss301.anticode.cinema_service.repository;

import com.mss301.anticode.cinema_service.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Integer> {

}
