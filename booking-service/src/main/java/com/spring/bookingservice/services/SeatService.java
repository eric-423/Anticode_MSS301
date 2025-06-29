package com.spring.bookingservice.services;

import java.util.List;

public interface SeatService {
    List<String> getUnavailableSeat(int showTimeId);
}
