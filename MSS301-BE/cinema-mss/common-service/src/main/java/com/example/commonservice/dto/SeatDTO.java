package com.example.commonservice.dto;

import com.example.commonservice.dto.enums.TicketStatus;
import lombok.Data;

@Data
public class SeatDTO {
    private String seatName;
    private TicketStatus status;
}
