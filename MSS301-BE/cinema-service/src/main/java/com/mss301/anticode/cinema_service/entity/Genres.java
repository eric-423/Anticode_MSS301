package com.mss301.anticode.cinema_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "Genres")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Genres {

    @Id
    @Column(name = "genre_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "genre_name", nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "genres", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Movie> movies;
}
