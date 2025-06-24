package com.example.cinemaservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Showtimes")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Showtime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "showtime_id")
    private int id;

    @Column(name = "start_time", nullable = false)
    private Date startTime;

    @Column(name = "end_time", nullable = false)
    private Date endTime;

    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "cinema_hall_id", nullable = false)
    private CinemaHall cinemaHall;

    @OneToMany(mappedBy = "showtime", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ShowtimeTicketPrice> showtimeTicketPrices;

}
