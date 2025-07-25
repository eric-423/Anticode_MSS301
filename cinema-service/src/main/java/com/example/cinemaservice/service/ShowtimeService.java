package com.example.cinemaservice.service;

import com.example.cinemaservice.dtos.CinemaHallsDTO;
import com.example.cinemaservice.dtos.HallTypeDTO;
import com.example.cinemaservice.dtos.ShowTimeDTO;
import com.example.cinemaservice.dtos.ShowtimeTicketPriceDTO;
import com.example.cinemaservice.entity.CinemaHall;
import com.example.cinemaservice.entity.HallType;
import com.example.cinemaservice.entity.Showtime;
import com.example.cinemaservice.entity.ShowtimeTicketPrice;
import com.example.cinemaservice.repository.*;
import com.example.cinemaservice.service.Imp.ShowtimeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    @Autowired
    private CinemaHallRepository cinemaHallRepository;

    @Autowired
    private ShowtimeTicketPriceRepository showtimeTicketPriceRepository;
    @Autowired
    private TicketTypeRepository ticketTypeRepository;

    public ShowtimeService(ShowtimeRepository repository) {
        this.repository = repository;
    }

    @Override
    public Showtime create(Showtime entity) {
        return repository.save(entity);
    }

    @Override
    public ShowTimeDTO getById(Integer id) {
        Optional<Showtime> optionalShowtime = repository.findById(id);
        if (optionalShowtime.isEmpty()) {
            throw new RuntimeException("Showtime not found: " + id);
        }
        Showtime showtime = optionalShowtime.get();
        ShowTimeDTO showTimeDTO = convertToDTO(showtime);

        return showTimeDTO;
    }

    @Override
    public List<ShowTimeDTO> getAll() {
        List<Showtime> showtimes = repository.findAll();
        return showtimes.stream().map(this::convertToDTO).toList();
    }

    @Override
    public List<ShowTimeDTO> findByMovieId(int movieId) {
        List<Showtime> showTimes = repository.findByMovieId(movieId);
        return showTimes.stream().map(this::convertToDTO).toList();
    }

    @Override
    public ShowTimeDTO update(Integer id, ShowTimeDTO showTimeDTO) {
        Showtime existingShowtime = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Showtime not found: " + id));

        if (showTimeDTO.getStartTime().before(new Date())) {
            throw new RuntimeException("Start time cannot be in the past.");
        }

        com.example.cinemaservice.entity.Movie movie = moveieRepository.findById(showTimeDTO.getMovieId())
                .orElseThrow(() -> new RuntimeException("Movie not found: " + showTimeDTO.getMovieId()));

        long durationInMillis = movie.getDuration() * 60000L;
        Date endTime = new Date(showTimeDTO.getStartTime().getTime() + durationInMillis);

        existingShowtime.setStartTime(showTimeDTO.getStartTime());
        existingShowtime.setEndTime(endTime);
        existingShowtime.setMovie(movie);
        existingShowtime.setCinemaHall(cinemaHallRepository.findById(showTimeDTO.getCinemaHallId()).get());

        repository.save(existingShowtime);
        return convertToDTO(existingShowtime);
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

        for (Showtime showtime : showtimes) {
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

        Date startDate = java.sql.Timestamp.valueOf(startOfDay);
        Date endDate = java.sql.Timestamp.valueOf(endOfDay);

        List<Showtime> showtimes = repository.findByMovieId(movieId);

        List<ShowTimeDTO> result = new ArrayList<>();

        for (Showtime showtime : showtimes) {
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

    private ShowTimeDTO convertToDTO(Showtime showtime) {
        ShowTimeDTO showTimeDTO = new ShowTimeDTO();
        showTimeDTO.setId(showtime.getId());
        showTimeDTO.setStartTime(showtime.getStartTime());
        showTimeDTO.setEndTime(showtime.getEndTime());
        showTimeDTO.setCinemaHallId(showtime.getCinemaHall().getId());
        showTimeDTO.setMovieId(showtime.getMovie().getId());
        showTimeDTO.setMovieTitle(showtime.getMovie().getTitle());

        HallTypeDTO hallTypeDTO = new HallTypeDTO();
        HallType hallType = showtime.getCinemaHall().getHallType();
        hallTypeDTO.setId(hallType.getId());
        hallTypeDTO.setName(hallType.getName());
        hallTypeDTO.setRoll(hallType.getRoll());
        hallTypeDTO.setColumn(hallType.getColumn());

        CinemaHall cinemaHall = cinemaHallRepository.getCinemaHallById(showtime.getCinemaHall().getId());
        CinemaHallsDTO cinemaHallsDTO = new CinemaHallsDTO();
        cinemaHallsDTO.setId(cinemaHall.getId());
        cinemaHallsDTO.setHallName(cinemaHall.getHallName());
        cinemaHallsDTO.setScrrenType(cinemaHall.getScrrenType());
        cinemaHallsDTO.setHallType(hallTypeDTO);
        showTimeDTO.setCinemaHall(cinemaHallsDTO);
        return showTimeDTO;
    }


    @Override
    public ShowTimeDTO createShowtime(ShowTimeDTO showTimeDTO) {
        if (showTimeDTO.getStartTime().before(new Date())) {
            throw new RuntimeException("Start time cannot be in the past.");
        }

        com.example.cinemaservice.entity.Movie movie = moveieRepository.findById(showTimeDTO.getMovieId())
                .orElseThrow(() -> new RuntimeException("Movie not found: " + showTimeDTO.getMovieId()));

        long durationInMillis = movie.getDuration() * 60000L;
        Date endTime = new Date(showTimeDTO.getStartTime().getTime() + durationInMillis);
        Showtime showtime = new Showtime();
        showtime.setStartTime(showTimeDTO.getStartTime());
        showtime.setEndTime(endTime);
        showtime.setMovie(movie);
        showtime.setCinemaHall(cinemaHallRepository.findById(showTimeDTO.getCinemaHallId()).get());
        Showtime showtimeSaved = repository.save(showtime);
        ShowtimeTicketPrice showtimeTicketPrice = new ShowtimeTicketPrice();
        showtimeTicketPrice.setShowtime(showtimeSaved);
        showtimeTicketPrice.setTicketPrice(50000);
        showtimeTicketPrice.setTicketType(ticketTypeRepository.findById(1).orElseThrow());
        showtimeTicketPriceRepository.save(showtimeTicketPrice);
        return convertToDTO(showtime);
    }
    @Override
    public List<ShowTimeDTO> getShowtimesByCinemaHall(int cinemaHallId) {
        List<Showtime> showtimes = repository.getShowtimesByCinemaHall_Id(cinemaHallId);
        return showtimes.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
}
