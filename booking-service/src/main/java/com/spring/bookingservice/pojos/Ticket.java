package com.spring.bookingservice.pojos;

import com.spring.bookingservice.dtos.enums.TicketStatus;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Ticket")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_id")
    private int id;

    @Column(name = "price")
    private double price;

    @Column(name = "qr_image")
    private String qrImage;

    @Column(name = "status")
    private TicketStatus status;

    @Column(name = "seat_name")
    private String seatName;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @Column(name = "ticket_type_id")
    private int ticketType;

    @Column(name = "showtime_id")
    private int showtime;

}
