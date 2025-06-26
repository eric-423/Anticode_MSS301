package com.spring.bookingservice.kafka;

import com.spring.bookingservice.dtos.TransactionDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class PaymentProducer {

    private final KafkaTemplate<String, TransactionDTO> kafkaTemplate;
    private final String topic;

    public PaymentProducer(KafkaTemplate<String, TransactionDTO> kafkaTemplate,
                           @Value("${app.kafka.payment-topic:payment-events}") String topic) {
        this.kafkaTemplate = kafkaTemplate;
        this.topic = topic;
    }

    public void publishTransaction(TransactionDTO dto) {
        System.out.println("Publishing transaction event to topic: " + topic);
        System.out.println("Transaction data: " + dto);
        try {
            kafkaTemplate.send(topic, dto);
            System.out.println("Transaction event sent successfully");
        } catch (Exception e) {
            System.err.println("Failed to send transaction event: " + e.getMessage());
            e.printStackTrace();
        }
    }
} 