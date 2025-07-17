package com.spring.bookingservice.services;


import com.spring.bookingservice.dtos.BookingCustomerDTO;
import com.spring.bookingservice.dtos.BookingDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BookingService {
    public BookingDTO getBooking(int id);

    public List<BookingDTO> getBookings();

    public BookingDTO createBooking(BookingDTO bookingDTO);

    public BookingDTO updateBooking(int id, BookingDTO bookingDTO);

    public boolean deleteBooking(int id);

    public Page<BookingCustomerDTO> getBookingsByCustomerId(int customerId, int page, int size);

    public BookingCustomerDTO getBookingByIdForCustomer(int id);
}
