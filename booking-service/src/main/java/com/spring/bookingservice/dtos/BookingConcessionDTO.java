package com.spring.bookingservice.dtos;

import lombok.Data;

@Data
public class BookingConcessionDTO {
    private int id;
    private int quantity;
    private String concessionName;
    private int concessionProductID;
    private double price=0;
}