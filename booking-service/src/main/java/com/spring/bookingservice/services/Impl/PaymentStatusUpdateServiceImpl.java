package com.spring.bookingservice.services.Impl;

import com.spring.bookingservice.dtos.PaymentStatusUpdateDTO;
import com.spring.bookingservice.dtos.enums.BookingStatus;
import com.spring.bookingservice.dtos.enums.PaymentStatus;
import com.spring.bookingservice.pojos.Booking;
import com.spring.bookingservice.repositories.BookingRepository;
import com.spring.bookingservice.services.PaymentStatusUpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentStatusUpdateServiceImpl implements PaymentStatusUpdateService {

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public void updateBookingStatus(PaymentStatusUpdateDTO paymentStatusUpdateDTO) {
        Booking booking = bookingRepository.getBookingById(paymentStatusUpdateDTO.getBookingId());
        if (booking == null) {
            return;
        }
        
        // Update booking status based on payment status
        switch (paymentStatusUpdateDTO.getPaymentStatus()) {
            case COMPLETED:
                booking.setBookingStatus(BookingStatus.CONFIRMED);
                break;
            case FAILED:
            case CANCELLED:
                booking.setBookingStatus(BookingStatus.CANCELLED);
                break;
            case PENDING:
                // Keep current status
                break;
            default:
                // Handle other statuses if needed
                break;
        }
        
        bookingRepository.save(booking);
    }
} 