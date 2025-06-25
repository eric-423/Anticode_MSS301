package com.spring.bookingservice.repositories;

import com.spring.bookingservice.pojos.Booking;
import com.spring.bookingservice.pojos.BookingConcession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.stream.Stream;

public interface BookingConcessionRepository extends JpaRepository<BookingConcession, Integer> {
    BookingConcession getBookingConcessionById(int id);

    List<BookingConcession> getBookingConcessionsByBooking_Id(int bookingId);
}
