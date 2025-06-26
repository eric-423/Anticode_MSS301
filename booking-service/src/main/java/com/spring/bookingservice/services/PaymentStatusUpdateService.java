package com.spring.bookingservice.services;

import com.spring.bookingservice.dtos.PaymentStatusUpdateDTO;

public interface PaymentStatusUpdateService {
    void updateBookingStatus(PaymentStatusUpdateDTO paymentStatusUpdateDTO);
} 