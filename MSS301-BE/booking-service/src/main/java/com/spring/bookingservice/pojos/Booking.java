package com.spring.bookingservice.pojos;

import com.spring.bookingservice.pojos.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private int id;

    @Column(name = "guest_email")
    private String guestEmail;

    @Column(name = "total_price")
    private double totalPrice;

    @Column(name = "booking_status")
    private BookingStatus bookingStatus;

    @Column(name = "book_date")
    private Date bookDate;

    @Column(name = "transaction_id")
    private int transactionID;

    @Column(name = "user_id")
    private int userID;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<BookingConcession> bookingConcessionList;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Ticket> bookingSeatList;
}
