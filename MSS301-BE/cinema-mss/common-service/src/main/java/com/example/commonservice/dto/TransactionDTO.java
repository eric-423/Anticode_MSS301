package com.example.commonservice.dto;

import com.example.commonservice.dto.enums.PaymentMethods;

import com.example.commonservice.dto.enums.PaymentStatus;
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
