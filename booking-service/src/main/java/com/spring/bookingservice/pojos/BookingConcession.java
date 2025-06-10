package com.spring.bookingservice.pojos;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "BookingConcessions")
public class BookingConcession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "concession_id")
    private int id;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @Column(name = "concession_product_id", nullable = false)
    private int concessionProductID;
}
