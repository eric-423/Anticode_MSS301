package com.example.cinemaservice.dtos;

import com.example.cinemaservice.entity.HallType;
import com.example.cinemaservice.entity.Showtime;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
public class CinemaHallsDTO {
    private int id;

    private String hallName;

    private String scrrenType;

    private HallTypeDTO hallType;

    private List<ShowTimeDTO> showtimes;
}
