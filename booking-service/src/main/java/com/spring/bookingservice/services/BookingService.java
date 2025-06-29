package com.spring.bookingservice.services;



import com.spring.bookingservice.dtos.BookingCustomerDTO;
import com.spring.bookingservice.dtos.BookingDTO;

import java.util.List;

public interface BookingService {
    public BookingDTO getBooking(int id);
    public List<BookingDTO> getBookings();
    public BookingDTO createBooking(BookingDTO bookingDTO);
    public BookingDTO updateBooking(int id, BookingDTO bookingDTO);
    public boolean deleteBooking(int id);
    public List<BookingCustomerDTO> getBookingsByCustomerId(int customerId);
    public BookingCustomerDTO getBookingByIdForCustomer(int id);
}
