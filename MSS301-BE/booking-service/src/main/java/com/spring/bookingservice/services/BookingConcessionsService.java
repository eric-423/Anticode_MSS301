package com.spring.bookingservice.services;

import com.spring.bookingservice.dtos.BookingConcessionDTO;

import java.util.List;

public interface BookingConcessionsService {
    public BookingConcessionDTO getBookingConcession(int id);
    public List<BookingConcessionDTO> getBookingConcessions();
    public BookingConcessionDTO createBookingConcession(BookingConcessionDTO bookingConcession);
    public BookingConcessionDTO updateBookingConcession(int id, BookingConcessionDTO bookingConcession);
    public boolean deleteBookingConcession(int id);
}
