package com.spring.bookingservice.dtos;

import lombok.Data;

import java.util.Date;

@Data
public class ProductSoldDTO {
    private Date date;
    private Integer number;
}
