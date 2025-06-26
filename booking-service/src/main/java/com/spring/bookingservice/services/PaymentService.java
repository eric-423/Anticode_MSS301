package com.spring.bookingservice.services;

import com.spring.bookingservice.dtos.BookingDTO;
import com.spring.bookingservice.dtos.PaymentRequestDTO;
import com.spring.bookingservice.dtos.PaymentResponseDTO;

public interface PaymentService {
    PaymentResponseDTO createPayment(BookingDTO bookingDTO, PaymentRequestDTO paymentRequest);

} 