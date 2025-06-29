package com.spring.bookingservice.services;

import com.spring.bookingservice.dtos.SeatHoldInfo;

import java.util.List;

public interface RedisHoldingSeatService {
    boolean holdSeat(SeatHoldInfo info);

    List<String> getSeatsByShowTime(String showTimeId);
}
