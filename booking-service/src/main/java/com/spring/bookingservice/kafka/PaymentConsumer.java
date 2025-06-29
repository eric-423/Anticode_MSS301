package com.spring.bookingservice.kafka;


import com.spring.bookingservice.dtos.TransactionDTO;
import com.spring.bookingservice.dtos.enums.BookingStatus;
import com.spring.bookingservice.dtos.enums.PaymentStatus;
import com.spring.bookingservice.dtos.enums.TicketStatus;
import com.spring.bookingservice.pojos.Booking;
import com.spring.bookingservice.pojos.Ticket;
import com.spring.bookingservice.repositories.BookingRepository;
import com.spring.bookingservice.repositories.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentConsumer {

    private final BookingRepository bookingRepository;

    @Autowired
    private TicketRepository ticketRepository;

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
            List<Ticket> ticketList = booking.getBookingSeatList();

            for (Ticket ticket : ticketList) {
                ticket.setStatus(TicketStatus.PAID);
            }
            ticketRepository.saveAll(ticketList);


        } else if (dto.getPaymentStatus() == PaymentStatus.FAILED || dto.getPaymentStatus() == PaymentStatus.CANCELLED) {
            booking.setBookingStatus(BookingStatus.CANCELLED);
            List<Ticket> ticketList = booking.getBookingSeatList();
            for (Ticket ticket : ticketList) {
                ticket.setStatus(TicketStatus.CANCELLED);
            }
            ticketRepository.saveAll(ticketList);
        }
        bookingRepository.save(booking);
    }
}
