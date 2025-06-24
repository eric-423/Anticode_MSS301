package com.spring.bookingservice.dtos;

import com.spring.bookingservice.dtos.enums.TicketStatus;
import lombok.Data;

@Data
public class SeatDTO {
    private String seatName;
    private TicketStatus status;
}