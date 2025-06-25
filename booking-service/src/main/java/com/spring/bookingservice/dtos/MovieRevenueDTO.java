package com.spring.bookingservice.dtos;

import lombok.Data;

@Data
public class MovieRevenueDTO {
    private String movieName;
    private double revenue;
    private int movieID;
}
