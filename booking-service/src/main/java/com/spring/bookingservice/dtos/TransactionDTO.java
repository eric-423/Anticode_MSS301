package com.spring.bookingservice.dtos;

import com.spring.bookingservice.dtos.enums.PaymentMethods;
import com.spring.bookingservice.dtos.enums.PaymentStatus;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class TransactionDTO implements Serializable {
    private int id;
    private PaymentMethods paymentMethod;
    private double amount;
    private LocalDateTime transactionDate;
    private PaymentStatus paymentStatus;
    private int bookingId;
    private String paymentId;
    private String orderCode;
}