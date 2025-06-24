package com.spring.bookingservice.kafka;

import com.spring.bookingservice.dtos.BookingDTO;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class BookingConsumer {

    @KafkaListener(topics = "${app.kafka.booking-topic:booking-events}", groupId = "booking-service", containerFactory = "transactionKafkaListenerContainerFactory")
    public void handleBookingEvent(BookingDTO bookingDTO) {
        System.out.println("Received booking event: " + bookingDTO);
    }
}
