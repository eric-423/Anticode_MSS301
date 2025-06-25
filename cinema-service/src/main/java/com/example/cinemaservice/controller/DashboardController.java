package com.example.cinemaservice.controller;

import com.example.cinemaservice.dtos.MovieDashboardDTO;
import com.example.cinemaservice.service.Imp.DashboardServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardServiceImp dashboardServiceImp;

    @GetMapping("/movies-now-showing")
    public ResponseEntity<List<MovieDashboardDTO>> getMoviesNowShowing() {
        return new ResponseEntity<>(dashboardServiceImp.getMoviesDashboard(), HttpStatus.OK);
    }
}
