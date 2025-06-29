package com.spring.bookingservice.repositories;

import com.spring.bookingservice.pojos.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;


public interface BookingRepository  extends JpaRepository<Booking, Integer> {
    Booking getBookingById(int id);

    @Query("SELECT COALESCE(COUNT(bs.id), 0) " +
            "FROM Booking b " +
            "JOIN b.bookingSeatList bs " +
            "WHERE b.bookDate >= :startOfDay AND b.bookDate < :endOfDay")
    Integer countTotalTicketsForDay(@Param("startOfDay") LocalDateTime startOfDay,
                                    @Param("endOfDay") LocalDateTime endOfDay);


    @Query("SELECT COALESCE(COUNT(bs.id), 0) " +
            "FROM Booking b " +
            "JOIN b.bookingConcessionList bs " +
            "WHERE b.bookDate >= :startOfDay AND b.bookDate < :endOfDay")
    Integer countTotalConcessionsProductsForDay(@Param("startOfDay") LocalDateTime startOfDay,
                                                @Param("endOfDay") LocalDateTime endOfDay);

    List<Booking> findByUserID(int userID);


    List<Booking> getBookingByBookDateBetween(Date bookDateAfter, Date bookDateBefore);
}
