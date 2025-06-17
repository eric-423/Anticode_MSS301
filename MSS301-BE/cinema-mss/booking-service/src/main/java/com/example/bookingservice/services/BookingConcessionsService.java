package com.example.bookingservice.services;

import com.example.commonservice.dto.BookingConcessionDTO;

import java.util.List;

public interface BookingConcessionsService {
    public BookingConcessionDTO getBookingConcession(int id);
    public List<BookingConcessionDTO> getBookingConcessions();

}
