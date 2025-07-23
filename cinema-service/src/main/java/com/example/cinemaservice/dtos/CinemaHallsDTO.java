package com.example.cinemaservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CinemaHallsDTO {
    private int id;

    private String hallName;

    private String scrrenType;

    private HallTypeDTO hallType;

    private List<ShowTimeDTO> showtimes;
}
