package com.example.cinemaservice.repository;

import com.example.cinemaservice.entity.ShowtimeTicketPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowtimeTicketPriceRepository extends JpaRepository<ShowtimeTicketPrice, Integer> {
    ShowtimeTicketPrice findByShowtime_IdAndTicketType_Id(int id, int id1);


}
