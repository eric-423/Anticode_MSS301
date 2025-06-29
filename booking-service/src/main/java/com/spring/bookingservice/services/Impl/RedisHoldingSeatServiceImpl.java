package com.spring.bookingservice.services.Impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.bookingservice.dtos.SeatHoldInfo;
import com.spring.bookingservice.services.RedisHoldingSeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class RedisHoldingSeatServiceImpl implements RedisHoldingSeatService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    private static final long HOLD_DURATION_SECONDS = 300;

    @Override
    public boolean holdSeat(SeatHoldInfo info) {
        String key = String.format("seat_hold:%s:%s", info.getShowTimeId(), info.getSeatName());

        try {
            String json = objectMapper.writeValueAsString(info);

            Boolean result = redisTemplate.opsForValue()
                    .setIfAbsent(key, json, Duration.ofSeconds(HOLD_DURATION_SECONDS));

            return Boolean.TRUE.equals(result);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<String> getSeatsByShowTime(String showTimeId) {
        Set<String> keys = redisTemplate.keys("seat_hold:" + showTimeId + ":*");
        List<String> result = new ArrayList<>();
        if (keys == null || keys.isEmpty()) return List.of();


        for (String key : keys) {
            Object jsonObj = redisTemplate.opsForValue().get(key);
            if (jsonObj instanceof String json) {
                try {
                    SeatHoldInfo info = objectMapper.readValue(json, SeatHoldInfo.class);
                    result.add(info.getSeatName());
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }
            }
        }

        return result;
    }


    public void releaseSeat(String showId, String seatId) {
        String key = String.format("seat_hold:%s:%s", showId, seatId);
        redisTemplate.delete(key);
    }
}
