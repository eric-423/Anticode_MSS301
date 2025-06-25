package com.spring.bookingservice.dtos;

import lombok.Data;

@Data
public class ConcessionProductDTO {
    private int id;

    private String name;

    private double price;

    private String productImageUrl;

    private String size;

}
