package com.mss301.anticode.cinema_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "CinemaHalls")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CinemaHall {

    @Id
    @Column(name = "hall_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "hall_name", nullable = false, unique = true)
    private String hallName;

    @Column(name = "screen_type", nullable = false)
    private String scrrenType;

    @ManyToOne
    @JoinColumn(name = "hall_type_id", nullable = false)
    private HallType hallType;

    @OneToMany(mappedBy = "cinemaHall", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Showtime> showtimes;

}
