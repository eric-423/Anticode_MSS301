package com.example.bookingservice.repositories;

import com.example.bookingservice.pojos.BookingConcession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingConcessionRepository extends JpaRepository<BookingConcession, Integer> {
    BookingConcession getBookingConcessionById(int id);
}
