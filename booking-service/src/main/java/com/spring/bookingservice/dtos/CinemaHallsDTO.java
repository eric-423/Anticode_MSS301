package com.spring.bookingservice.dtos;

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
