package com.example.cinemaservice.service;

import com.example.cinemaservice.dtos.ShowTimeDTO;
import com.example.cinemaservice.entity.Movie;
import com.example.cinemaservice.entity.Showtime;
import com.example.cinemaservice.repository.MovieRepository;
import com.example.cinemaservice.repository.ShowtimeRepository;
import com.example.cinemaservice.service.Imp.ShowtimeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Array;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ShowtimeService implements ShowtimeServiceImp {
    private final ShowtimeRepository repository;

    @Autowired
    private MovieRepository moveieRepository;

    public ShowtimeService(ShowtimeRepository repository) {
        this.repository = repository;
    }

    @Override
    public Showtime create(Showtime entity) {
        return repository.save(entity);
    }

    @Override
    public Optional<Showtime> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public List<Showtime> getAll() {
        return repository.findAll();
    }

    @Override
    public List<Showtime> findByMovieId(int movieId) {
        return repository.findByMovieId(movieId);
    }

    @Override
    public Showtime update(Integer id, Showtime entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Showtime not found: " + id);
        }
        entity.setId(id);
        return repository.save(entity);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }


    @Override
    public List<Date> getShowTimeDateByMovieId(int movieId) {

        List<Showtime> showtimes = repository.findByMovieId(movieId);
        List<Date> showTimeDates = new ArrayList<>();

        Date today = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(today);

        Date startDate = cal.getTime();

        int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
        int daysUntilSunday = Calendar.SATURDAY - dayOfWeek + 1;
        cal.add(Calendar.DAY_OF_MONTH, daysUntilSunday);
        Date endDate = cal.getTime();

        for(Showtime showtime : showtimes) {
            Date showTimeDate = showtime.getStartTime();
            if (showTimeDate.after(startDate) && showTimeDate.before(endDate)) {
                showTimeDates.add(showTimeDate);
            }
        }

        return showTimeDates;
    }

    @Override
    public List<ShowTimeDTO> getShowtimeByDate(String inputDateStr, int movieId) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate date;
        try {
            date = LocalDate.parse(inputDateStr, formatter);
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid date format. Expected dd/MM/yyyy");
        }

        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);

        System.out.println(startOfDay);
        System.out.println(endOfDay);
        System.out.println("Current server time: " + new Date());
        System.out.println("JVM timezone: " + TimeZone.getDefault());


        Date startDate = java.sql.Timestamp.valueOf(startOfDay);
        Date endDate = java.sql.Timestamp.valueOf(endOfDay);

        List<Showtime> showtimes = repository.findByMovieId(movieId);

        List<ShowTimeDTO> result = new ArrayList<>();

        for(Showtime showtime : showtimes) {
            Date showTime = showtime.getStartTime();
            if (showTime.after(startDate) && showTime.before(endDate)) {
                ShowTimeDTO showTimeDTO = new ShowTimeDTO();
                showTimeDTO.setId(showtime.getId());
                showTimeDTO.setStartTime(showtime.getStartTime());
                showTimeDTO.setEndTime(showtime.getEndTime());
                result.add(showTimeDTO);
            }
        }

        return result;
    }

}
