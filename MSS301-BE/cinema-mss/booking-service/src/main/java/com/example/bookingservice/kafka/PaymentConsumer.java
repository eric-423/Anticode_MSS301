package com.example.bookingservice.kafka;

import com.example.commonservice.dto.TransactionDTO;
import com.example.bookingservice.pojos.Booking;
import com.example.commonservice.dto.enums.BookingStatus;
import com.example.bookingservice.repositories.BookingRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class PaymentConsumer {

    private final BookingRepository bookingRepository;

    public PaymentConsumer(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @KafkaListener(topics = "${app.kafka.payment-topic:payment-events}", groupId = "booking-service", containerFactory = "transactionKafkaListenerContainerFactory")
    public void handlePayment(TransactionDTO dto) {
        Booking booking = bookingRepository.getBookingById(dto.getBookingId());
        if (booking == null) {
            return;
        }
        booking.setTransactionID(dto.getId());
        if (dto.getPaymentStatus() == com.example.commonservice.dto.enums.PaymentStatus.COMPLETED) {
            booking.setBookingStatus(BookingStatus.CONFIRMED);
        } else {
            booking.setBookingStatus(BookingStatus.CANCELLED);
        }
        bookingRepository.save(booking);
    }
}
