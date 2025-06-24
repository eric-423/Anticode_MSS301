package com.example.transactionservice.dto;

import com.example.transactionservice.dto.enums.TicketStatus;
import lombok.Data;

@Data
public class TicketDTO {
    private int id;
    private double price;
    private String qrImage;
    private TicketStatus status;
    private String seatName;
    private int ticketType;
    private int showtime;
}
