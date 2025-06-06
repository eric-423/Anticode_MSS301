package mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.entity;

import jakarta.persistence.*;
import lombok.*;
import mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.entity.enums.BookingStatus;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
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

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Transaction transaction;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BookingConcession> bookingConcessionList;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Ticket> bookingSeatList;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;
}
