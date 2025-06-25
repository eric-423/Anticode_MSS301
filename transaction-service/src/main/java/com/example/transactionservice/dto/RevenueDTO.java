package com.example.transactionservice.dto;

import lombok.Data;

import java.util.Date;

@Data
public class RevenueDTO {
    private Date date;
    private double revenue;
}
