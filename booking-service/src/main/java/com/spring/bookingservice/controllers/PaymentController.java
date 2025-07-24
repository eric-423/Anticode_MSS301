package com.spring.bookingservice.controllers;

import com.spring.bookingservice.dtos.BookingDTO;
import com.spring.bookingservice.dtos.PaymentRequestDTO;
import com.spring.bookingservice.dtos.PaymentResponseDTO;
import com.spring.bookingservice.dtos.PaymentStatusUpdateDTO;
import com.spring.bookingservice.dtos.enums.BookingStatus;
import com.spring.bookingservice.dtos.enums.PaymentStatus;
import com.spring.bookingservice.kafka.PaymentProducer;
import com.spring.bookingservice.pojos.Booking;
import com.spring.bookingservice.repositories.BookingRepository;
import com.spring.bookingservice.services.BookingService;
import com.spring.bookingservice.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.servlet.view.RedirectView;

import java.time.LocalDateTime;
import java.util.Map;
import com.spring.bookingservice.dtos.UserPointEvent;
import com.spring.bookingservice.kafka.UserPointProducer;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PaymentProducer paymentProducer;

    @Autowired
    private UserPointProducer userPointProducer;


    @PostMapping("/create")
    public ResponseEntity<PaymentResponseDTO> createPayment(
            @RequestParam int bookingId,
            @RequestBody PaymentRequestDTO paymentRequest) {

        try {
            BookingDTO bookingDTO = bookingService.getBooking(bookingId);
            if (bookingDTO == null) {
                return ResponseEntity.notFound().build();
            }

            PaymentResponseDTO response = paymentService.createPayment(bookingDTO, paymentRequest);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            PaymentResponseDTO errorResponse = new PaymentResponseDTO();
            errorResponse.setStatus("ERROR");
            errorResponse.setMessage("Payment creation failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/callback/success")
    public RedirectView handlePaymentSuccess(
            @RequestParam(required = false) Integer bookingId) {

        if (bookingId != null) {
            Booking booking = bookingRepository.getBookingById(bookingId);
            if (booking != null) {
                booking.setBookingStatus(BookingStatus.CONFIRMED);
                bookingRepository.save(booking);

                int userId = booking.getUserID();
                int point = (int) booking.getTotalPrice()/1000;
                if (userId > 0 && point > 0) {
                    UserPointEvent event = new UserPointEvent(userId, point, bookingId, booking.getTotalPrice(), java.time.LocalDateTime.now().toString());
                    userPointProducer.sendUserPointEvent(event);
                }

                com.spring.bookingservice.dtos.TransactionDTO transactionDTO = new com.spring.bookingservice.dtos.TransactionDTO();
                transactionDTO.setBookingId(bookingId);
                transactionDTO.setPaymentStatus(PaymentStatus.COMPLETED);
                transactionDTO.setAmount(booking.getTotalPrice());
                transactionDTO.setPaymentMethod(com.spring.bookingservice.dtos.enums.PaymentMethods.VIETQR);
                transactionDTO.setTransactionDate(LocalDateTime.parse(LocalDateTime.now().format(java.time.format.DateTimeFormatter.ISO_DATE_TIME)));

                System.out.println("Sending payment success event for booking: " + bookingId);
                paymentProducer.publishTransaction(transactionDTO);
            }
        }
        return new RedirectView("http://35.240.150.111/booking-success");
    }

    @GetMapping("/callback/cancel")
    public RedirectView handlePaymentCancel(
            @RequestParam(required = false) Integer bookingId,
            @RequestParam(required = false) String paymentId) {

        if (bookingId != null) {
            Booking booking = bookingRepository.getBookingById(bookingId);
            if (booking != null) {
                booking.setBookingStatus(com.spring.bookingservice.dtos.enums.BookingStatus.CANCELLED);
                bookingRepository.save(booking);

                com.spring.bookingservice.dtos.TransactionDTO transactionDTO = new com.spring.bookingservice.dtos.TransactionDTO();
                transactionDTO.setBookingId(bookingId);
                transactionDTO.setPaymentStatus(PaymentStatus.CANCELLED);
                paymentProducer.publishTransaction(transactionDTO);
            }
        }
        return new RedirectView("http://35.240.150.111/booking-fail");
    }


    @PostMapping("/status-update")
    public ResponseEntity<String> handlePaymentStatusUpdate(@RequestBody PaymentStatusUpdateDTO paymentStatusUpdateDTO) {
        try {
            if (paymentStatusUpdateDTO.getBookingId() != 0) {
                Booking booking = bookingRepository.getBookingById(paymentStatusUpdateDTO.getBookingId());
                if (booking != null) {
                    switch (paymentStatusUpdateDTO.getPaymentStatus()) {
                        case COMPLETED:
                            booking.setBookingStatus(com.spring.bookingservice.dtos.enums.BookingStatus.CONFIRMED);
                            break;
                        case FAILED:
                        case CANCELLED:
                            booking.setBookingStatus(com.spring.bookingservice.dtos.enums.BookingStatus.CANCELLED);
                            break;
                        case PENDING:
                            break;
                        default:
                            break;
                    }
                    bookingRepository.save(booking);
                }
            }

            return ResponseEntity.ok("Payment status update processed");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing payment status update: " + e.getMessage());
        }
    }
} 