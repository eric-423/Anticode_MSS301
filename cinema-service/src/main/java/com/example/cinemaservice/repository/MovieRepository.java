package com.example.cinemaservice.repository;

import com.example.cinemaservice.entity.Movie;
import com.example.cinemaservice.entity.enums.MovieStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    List<Movie> findByStatus(MovieStatus status);

    List<Movie> getMoviesByStatus(MovieStatus status);
}
