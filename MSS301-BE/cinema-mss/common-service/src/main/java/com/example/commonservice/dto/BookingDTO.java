package com.example.commonservice.dto;

import com.example.commonservice.dto.enums.BookingStatus;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class BookingDTO {
    private int id;
    private String guestEmail;
    private double totalPrice;
    private BookingStatus bookingStatus;
    private Date bookDate;
    private int transactionID;
    private int userID;
    private List<BookingConcessionDTO> bookingConcessionList;
    private List<TicketDTO> bookingSeatList;
}
