package com.example.transactionservice.kafka;

import com.example.transactionservice.dto.PaymentStatusUpdateDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class PaymentStatusUpdateProducer {

    private final KafkaTemplate<String, PaymentStatusUpdateDTO> kafkaTemplate;
    private final String topic;

    public PaymentStatusUpdateProducer(KafkaTemplate<String, PaymentStatusUpdateDTO> kafkaTemplate,
                                      @Value("${app.kafka.payment-status-topic:payment-status-events}") String topic) {
        this.kafkaTemplate = kafkaTemplate;
        this.topic = topic;
    }

    public void publishPaymentStatusUpdate(PaymentStatusUpdateDTO dto) {
        kafkaTemplate.send(topic, dto);
    }
} 