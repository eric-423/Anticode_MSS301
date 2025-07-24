package com.example.transactionservice.dto;

import com.example.transactionservice.dto.enums.PaymentMethods;
import com.example.transactionservice.dto.enums.PaymentStatus;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class TransactionDTO implements Serializable {
    private int id;
    private PaymentMethods paymentMethod;
    private double amount;
    private int userId;
    private LocalDateTime transactionDate;
    private PaymentStatus paymentStatus;
    private int bookingId;
    private String paymentId;
    private String orderCode;
}
