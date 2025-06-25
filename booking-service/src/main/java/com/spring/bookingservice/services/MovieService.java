package com.spring.bookingservice.services;

import com.spring.bookingservice.dtos.MovieDashboardDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "cinema-service", url = "${cinema.service.url}")
public interface MovieService {
    @GetMapping("dashboard/movies-now-showing")
    public List<MovieDashboardDTO> getMoviesNowShowing();
}
