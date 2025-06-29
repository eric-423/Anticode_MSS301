package com.spring.bookingservice.services;

import com.spring.bookingservice.dtos.MovieDTO;
import com.spring.bookingservice.dtos.MovieDashboardDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "cinema-service", url = "${cinema.service.url}")
public interface MovieService {
    @GetMapping("dashboard/movies-now-showing")
    public List<MovieDashboardDTO> getMoviesNowShowing();

    @GetMapping("movies/get/{ticketId}")
    public MovieDTO getMovieByTicket(@PathVariable("ticketId") Integer ticketId);
}
