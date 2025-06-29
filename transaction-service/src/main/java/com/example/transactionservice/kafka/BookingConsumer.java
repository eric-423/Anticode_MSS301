package com.example.transactionservice.kafka;

import com.example.transactionservice.dto.BookingDTO;
import com.example.transactionservice.dto.TransactionDTO;
import com.example.transactionservice.dto.enums.PaymentMethods;
import com.example.transactionservice.dto.enums.PaymentStatus;
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
        transactionDTO.setPaymentMethod(PaymentMethods.BANK_TRANSFER);
        transactionDTO.setAmount(bookingDTO.getTotalPrice());
        transactionDTO.setTransactionDate(LocalDateTime.parse(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME)));
        transactionDTO.setBookingId(bookingDTO.getId());
        transactionDTO.setPaymentStatus(PaymentStatus.PENDING);
        
        String currentTimeString = String.valueOf(System.currentTimeMillis());
        long orderCode = Long.parseLong(currentTimeString.substring(currentTimeString.length() - 6));
        transactionDTO.setOrderCode(String.valueOf(orderCode));
        
        TransactionDTO saved = transactionService.createTransaction(transactionDTO);
        paymentProducer.publishTransaction(saved);
    }
}
