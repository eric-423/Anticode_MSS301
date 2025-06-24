package com.example.transactionservice.dto;

import com.example.transactionservice.dto.enums.PaymentMethods;
import com.example.transactionservice.dto.enums.PaymentStatus;
import lombok.Data;

import java.io.Serializable;

@Data
public class TransactionDTO implements Serializable {
    private int id;
    private PaymentMethods paymentMethod;
    private double amount;
    private String transactionDate;
    private PaymentStatus paymentStatus;
    private int bookingId;
}
