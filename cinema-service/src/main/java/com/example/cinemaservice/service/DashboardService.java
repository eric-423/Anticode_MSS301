package com.example.cinemaservice.service;

import com.example.cinemaservice.dtos.MovieDashboardDTO;
import com.example.cinemaservice.entity.Movie;
import com.example.cinemaservice.entity.Showtime;
import com.example.cinemaservice.entity.enums.MovieStatus;
import com.example.cinemaservice.repository.MovieRepository;
import com.example.cinemaservice.repository.ShowtimeRepository;
import com.example.cinemaservice.service.Imp.DashboardServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService implements DashboardServiceImp {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ShowtimeRepository showtimeRepository;

    @Override
    public List<MovieDashboardDTO> getMoviesDashboard() {
        List<MovieDashboardDTO> results = new ArrayList<>();
        List<Movie> movies = movieRepository.getMoviesByStatus(MovieStatus.NOW_SHOWING);
        movies.forEach(movie -> {
            MovieDashboardDTO dto = new MovieDashboardDTO();
            dto.setMovieID(movie.getId());
            dto.setMovieName(movie.getTitle());
            dto.setShowTimesIDs(  showtimeRepository.getShowtimesByMovie_Id(movie.getId()).stream().map(Showtime::getId).toList());
            results.add(dto);
        });
        return results;
    }
}
