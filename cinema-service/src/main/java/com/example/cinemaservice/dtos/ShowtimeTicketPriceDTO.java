package com.example.cinemaservice.dtos;

import com.example.cinemaservice.entity.Showtime;
import com.example.cinemaservice.entity.TicketType;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.io.Serializable;

@Data
public class ShowtimeTicketPriceDTO implements Serializable {

    private int id;
    private double ticketPrice;


}
