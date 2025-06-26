package com.spring.bookingservice.dtos;

import lombok.Data;

@Data
public class PaymentResponseDTO {
    private String paymentUrl;
    private String paymentId;
    private String status;
    private String message;
} 