package com.example.cinemaservice.dtos;

import lombok.Data;

import java.util.List;

@Data
public class MovieDashboardDTO {
    private String movieName;
    private List<Integer> showTimesIDs;
    private int movieID;
}
