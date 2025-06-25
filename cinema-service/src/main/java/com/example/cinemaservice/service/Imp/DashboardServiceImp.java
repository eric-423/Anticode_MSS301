package com.example.cinemaservice.service.Imp;

import com.example.cinemaservice.dtos.MovieDashboardDTO;

import java.util.List;

public interface DashboardServiceImp {
    List<MovieDashboardDTO> getMoviesDashboard();
}
