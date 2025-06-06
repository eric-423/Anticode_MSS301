package mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ShowtimeTicketPrices")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShowtimeTicketPrice {

    @Id
    @Column(name = "showtime_ticket_price_id")
    private int id;

    @Column(name = "ticket_price", nullable = false)
    private double ticketPrice;

    @ManyToOne
    @JoinColumn(name = "showtime_id", nullable = false)
    private Showtime showtime;

    @ManyToOne
    @JoinColumn(name = "ticket_type_id", nullable = false)
    private TicketType ticketType;
}
