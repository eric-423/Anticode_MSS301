package com.spring.bookingservice.pojos;

import com.spring.bookingservice.pojos.enums.TicketStatus;
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

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "qr_image", nullable = false)
    private String qrImage;

    @Column(name = "status")
    private TicketStatus status;

    @Column(name = "seat_name", nullable = false)
    private String seatName;

    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @Column(name = "ticket_type_id", nullable = false)
    private int ticketType;

    @Column(name = "showtime_id", nullable = false)
    private int showtime;

}
