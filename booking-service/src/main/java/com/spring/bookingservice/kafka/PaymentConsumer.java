package com.spring.bookingservice.kafka;



import com.spring.bookingservice.dtos.TransactionDTO;
import com.spring.bookingservice.dtos.enums.BookingStatus;
import com.spring.bookingservice.dtos.enums.PaymentStatus;
import com.spring.bookingservice.pojos.Booking;
import com.spring.bookingservice.repositories.BookingRepository;
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
        if (dto.getPaymentStatus() == PaymentStatus.COMPLETED) {
            booking.setBookingStatus(BookingStatus.CONFIRMED);
        } else {
            booking.setBookingStatus(BookingStatus.CANCELLED);
        }
        bookingRepository.save(booking);
    }
}
