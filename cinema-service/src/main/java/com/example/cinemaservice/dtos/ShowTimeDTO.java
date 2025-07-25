package com.example.cinemaservice.dtos;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class ShowTimeDTO implements Serializable {
    private int id;
    private Date startTime;
    private Date endTime;
    private Integer movieId;
    private String movieTitle;
    private Integer duration;
    private Integer cinemaHallId;
    private CinemaHallsDTO cinemaHall;
}
