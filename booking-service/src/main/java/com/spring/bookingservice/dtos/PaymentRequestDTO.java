package com.spring.bookingservice.dtos;

import com.spring.bookingservice.dtos.enums.PaymentMethods;
import lombok.Data;

@Data
public class PaymentRequestDTO {
    private PaymentMethods paymentMethod;
} 