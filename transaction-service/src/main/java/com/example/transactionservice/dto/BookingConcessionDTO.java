package com.example.transactionservice.dto;

import lombok.Data;

@Data
public class BookingConcessionDTO {
    private int id;
    private int quantity;
    private int concessionProductID;
}
