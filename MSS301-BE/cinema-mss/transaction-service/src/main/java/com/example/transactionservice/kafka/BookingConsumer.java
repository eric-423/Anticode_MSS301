package com.example.transactionservice.kafka;

import com.example.commonservice.dto.BookingDTO;
import com.example.commonservice.dto.TransactionDTO;
import com.example.commonservice.dto.enums.PaymentMethods;
import com.example.transactionservice.service.serviceImpl.TransactionService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class BookingConsumer {

    private final TransactionService transactionService;
    private final PaymentProducer paymentProducer;

    public BookingConsumer(TransactionService transactionService, PaymentProducer paymentProducer) {
        this.transactionService = transactionService;
        this.paymentProducer = paymentProducer;
    }

    @KafkaListener(topics = "${app.kafka.booking-topic:booking-events}", groupId = "transaction-service",containerFactory = "bookingKafkaListenerContainerFactory")
    public void handleBookingEvent(BookingDTO bookingDTO) {
        TransactionDTO transactionDTO = new TransactionDTO();
        transactionDTO.setPaymentMethod(PaymentMethods.CASH);
        transactionDTO.setAmount(bookingDTO.getTotalPrice());
        transactionDTO.setTransactionDate(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        transactionDTO.setBookingId(bookingDTO.getId());
        TransactionDTO saved = transactionService.createTransaction(transactionDTO);
        paymentProducer.publishTransaction(saved);
    }
}
