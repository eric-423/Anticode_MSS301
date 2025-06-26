package com.spring.bookingservice.kafka;

import com.spring.bookingservice.dtos.PaymentStatusUpdateDTO;
import com.spring.bookingservice.services.PaymentStatusUpdateService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class PaymentStatusUpdateConsumer {

    private final PaymentStatusUpdateService paymentStatusUpdateService;

    public PaymentStatusUpdateConsumer(PaymentStatusUpdateService paymentStatusUpdateService) {
        this.paymentStatusUpdateService = paymentStatusUpdateService;
    }

    @KafkaListener(topics = "${app.kafka.payment-status-topic:payment-status-events}", 
                   groupId = "booking-service", 
                   containerFactory = "paymentStatusUpdateKafkaListenerContainerFactory")
    public void handlePaymentStatusUpdate(PaymentStatusUpdateDTO dto) {
        paymentStatusUpdateService.updateBookingStatus(dto);
    }
} 