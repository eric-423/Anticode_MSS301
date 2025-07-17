package com.spring.bookingservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPointEvent {
    private int userId;
    private int point;
    private int bookingId;
    private double amount;
    private String eventTime;
} 