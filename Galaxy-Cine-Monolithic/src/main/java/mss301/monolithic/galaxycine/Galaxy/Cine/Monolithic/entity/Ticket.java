package mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.entity.enums.TicketStatus;

@Table(name = "Tickets")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
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

    @ManyToOne
    @JoinColumn(name="tickt_type_id", nullable = false)
    private TicketType ticketType;

    @ManyToOne
    @JoinColumn(name = "showtime_id", nullable = false)
    private Showtime showtime;
}
