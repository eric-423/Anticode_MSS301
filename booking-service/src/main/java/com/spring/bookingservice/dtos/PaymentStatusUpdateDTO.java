package com.spring.bookingservice.dtos;

import com.spring.bookingservice.dtos.enums.PaymentStatus;
import lombok.Data;

import java.io.Serializable;

@Data
public class PaymentStatusUpdateDTO implements Serializable {
    private int transactionId;
    private int bookingId;
    private PaymentStatus paymentStatus;
    private String paymentId;
    private String message;
} 