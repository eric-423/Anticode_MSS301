package com.spring.bookingservice.repositories;

import com.spring.bookingservice.pojos.BookingConcession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingConcessionRepository extends JpaRepository<BookingConcession, Integer> {
    BookingConcession getBookingConcessionById(int id);
}
