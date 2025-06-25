package com.spring.bookingservice.dtos;

import lombok.Data;

import java.util.Date;

@Data
public class TicketSoldDTO {
    private Date date;
    private Integer number;
}
