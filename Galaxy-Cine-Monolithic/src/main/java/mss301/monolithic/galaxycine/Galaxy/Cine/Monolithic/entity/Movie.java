package mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.entity.enums.MovieStatus;

import java.util.List;

@Entity
@Table(name = "Movies")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movie_id")
    private int id;

    @Column(name = "title", nullable = false, unique = true)
    private String title;

    @Column(name ="synopsis")
    private String synopsis;

    @Column(name = "duration")
    private int duration;

    @Column(name = "age_ranging")
    private int ageRanging;

    @Column(name = "status")
    private MovieStatus status;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToMany
    @JoinTable(
        name = "Movie_Genres",
        joinColumns = @JoinColumn(name = "movie_id"),
        inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private List<Genres> genres;

    @ManyToMany
    @JoinTable(
            name = "Movies_Personnel",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "personnel_id")
    )
    private List<FilmPersonel> personels;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Showtime> showtimeList;

}
