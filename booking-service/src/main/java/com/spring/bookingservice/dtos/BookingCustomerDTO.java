package com.spring.bookingservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingCustomerDTO {
    private int bookingId;
    private String movieName;
    private String bookingStatus;
    private Date bookingDate;
    private Date showTime;
    private List<String> seatNumbers;
    private Double totalPrice;
    private String cinemaName;
    private String imageUrl;

    private List<BookingConcessionDTO> bookingConcessions;

}
