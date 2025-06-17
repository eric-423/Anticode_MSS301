package com.example.bookingservice.kafka;

import com.example.commonservice.dto.BookingDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class BookingProducer {

    private final KafkaTemplate<String, BookingDTO> kafkaTemplate;
    private final String topic;

    public BookingProducer(KafkaTemplate<String, BookingDTO> kafkaTemplate,
                           @Value("${app.kafka.booking-topic:booking-events}") String topic) {
        this.kafkaTemplate = kafkaTemplate;
        this.topic = topic;
    }

    public void publishBookingCreated(BookingDTO bookingDTO) {
        kafkaTemplate.send(topic, bookingDTO);
    }
}
