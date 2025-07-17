package com.spring.bookingservice.kafka;

import com.spring.bookingservice.dtos.UserPointEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserPointProducer {
    @Autowired
    private KafkaTemplate<String, UserPointEvent> kafkaTemplate;

    public void sendUserPointEvent(UserPointEvent event) {
        kafkaTemplate.send("user-point", event);
    }
} 