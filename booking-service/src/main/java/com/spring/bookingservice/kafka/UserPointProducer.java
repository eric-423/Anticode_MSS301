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
        System.out.println("[Kafka] Đang gửi event user-point: " + event);
        try {
            kafkaTemplate.send("user-point", event);
            System.out.println("[Kafka] Đã gửi event user-point thành công!");
        } catch (Exception e) {
            System.err.println("[Kafka] Lỗi khi gửi event user-point: " + e.getMessage());
            e.printStackTrace();
        }
    }
} 