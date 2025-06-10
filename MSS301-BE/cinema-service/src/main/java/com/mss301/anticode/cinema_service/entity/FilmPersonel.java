package com.mss301.anticode.cinema_service.entity;

import com.mss301.anticode.cinema_service.entity.enums.FilmPersonelRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "FilmPersonel")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilmPersonel {
    @Id
    @Column(name = "personel_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "role")
    private FilmPersonelRole role;

    @ManyToMany(mappedBy = "personels", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Movie> movies;
}
