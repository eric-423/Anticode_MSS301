package com.spring.bookingservice.repositories;

import com.spring.bookingservice.pojos.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository  extends JpaRepository<Booking, Integer> {
    Booking getBookingById(int id);
}
