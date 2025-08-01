package com.spring.accountservice.kafka;

import com.spring.accountservice.dto.UserPointEvent;
import com.spring.accountservice.entity.Users;
import com.spring.accountservice.repository.UserRepository;
import com.spring.accountservice.service.Imp.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class UserPointConsumer {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @KafkaListener(topics = "user-point", groupId = "account-service")
    public void consumeUserPointEvent(UserPointEvent event) {
        System.out.println("[Kafka] Đã nhận event user-point: " + event);
        Users user = userRepository.findById(event.getUserId()).orElse(null);
        if (user != null) {
            try {
                userService.increaseRoyalPoint(user.getId(), event.getPoint());
                System.out.println("[Kafka] Đã cộng " + event.getPoint() + " điểm cho userId: " + user.getId());
            } catch (Exception e) {
                System.err.println("[Kafka] Lỗi khi cộng điểm cho user ID: " + user.getId() + " - " + e.getMessage());
            }
        } else {
            System.err.println("[Kafka] Không tìm thấy user với ID: " + event.getUserId());
        }
    }
} 