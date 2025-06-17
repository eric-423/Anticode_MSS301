package com.example.transactionservice.kafka;

import com.example.commonservice.dto.TransactionDTO;
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
        kafkaTemplate.send(topic, dto);
    }
}
