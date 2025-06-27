package com.spring.bookingservice.services.Impl;

import com.spring.bookingservice.dtos.*;
import com.spring.bookingservice.pojos.Booking;
import com.spring.bookingservice.pojos.BookingConcession;
import com.spring.bookingservice.pojos.Ticket;
import com.spring.bookingservice.repositories.BookingConcessionRepository;
import com.spring.bookingservice.repositories.BookingRepository;
import com.spring.bookingservice.repositories.TicketRepository;
import com.spring.bookingservice.services.ConcessionProductService;
import com.spring.bookingservice.services.DashboardService;
import com.spring.bookingservice.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;


@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private BookingConcessionRepository bookingConcessionRepository;

    @Autowired
    private ConcessionProductService concessionProductService;

    @Autowired
    private MovieService movieService;

    @Override
    public TicketSoldDTO getDailyTicketsSold(Date date) {
        LocalDate localDate = date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        TicketSoldDTO result = new TicketSoldDTO();
        result.setDate(date);
        result.setNumber(bookingRepository
                .countTotalTicketsForDay(localDate.atStartOfDay(), localDate.atTime(23, 59, 59, 999999999)));
        return result;
    }

    @Override
    public ProductSoldDTO getDailyProductsSold(Date date) {
        LocalDate localDate = date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        ProductSoldDTO result = new ProductSoldDTO();
        result.setDate(date);
        result.setNumber(bookingRepository.countTotalConcessionsProductsForDay(localDate.atStartOfDay(), localDate.atTime(23, 59, 59, 999999999)));
        return result;
    }

    @Override
    public List<TicketRevenueDTO> getMonthlyTicketRevenue(Date date) {
        List<TicketRevenueDTO> result = new ArrayList<TicketRevenueDTO>();
        int year = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getYear();
        IntStream.range(0, 12).forEach(month -> {
            LocalDate firstDayOfMonth = LocalDate.of(year, month, 1);
            TicketRevenueDTO ticketRevenueDTO = new TicketRevenueDTO();
            ticketRevenueDTO.setRevenue(getRevenueTicketByMonth(firstDayOfMonth, firstDayOfMonth.with(TemporalAdjusters.lastDayOfMonth())));
            result.add(ticketRevenueDTO);
        });
        return result;
    }

    @Override
    public List<ProductRevenueDTO> getMonthlyProductRevenue(Date date) {
        int year = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getYear();
        IntStream.range(0, 12).forEach(month -> {
            LocalDate firstDayOfMonth = LocalDate.of(year, month, 1);
            ProductRevenueDTO productRevenueDTO = new ProductRevenueDTO();
            productRevenueDTO.setMonth(month);
            productRevenueDTO.setRevenue(getRevenueProductByMonth(firstDayOfMonth, firstDayOfMonth.with(TemporalAdjusters.lastDayOfMonth())));
        });
        return List.of();
    }

    @Override
    public List<MovieRevenueDTO> getMovieRevenueTop() {
        List<MovieDashboardDTO> movieDashboardDTOS = movieService.getMoviesNowShowing();
        List<MovieRevenueDTO> movieRevenueDTOS = new ArrayList<>();
        movieDashboardDTOS.forEach(movieDashboardDTO -> {
            MovieRevenueDTO movieRevenueDTO = new MovieRevenueDTO();
            movieRevenueDTO.setMovieName(movieDashboardDTO.getMovieName());
            movieRevenueDTO.setMovieID(movieDashboardDTO.getMovieID());
            movieRevenueDTO.setRevenue(movieDashboardDTO.getShowTimesIDs().stream()
                    .mapToDouble(showTime ->
                            ticketRepository.getTicketsByShowtime(showTime).stream().mapToDouble(Ticket::getPrice).sum())
                    .sum());
            movieRevenueDTOS.add(movieRevenueDTO);
        });
        return movieRevenueDTOS.stream()
                .sorted(Comparator.comparingDouble(MovieRevenueDTO::getRevenue).reversed())
                .limit(4)
                .toList();
    }

    private double getRevenueProductByMonth(LocalDate firstDayOfMonth, LocalDate lastDayOfMonth) {
        LocalDateTime startOfDayFirstMonth = firstDayOfMonth.atStartOfDay();
        LocalDateTime endOfDayLastMonth = lastDayOfMonth.atTime(LocalTime.MAX);

        List<Booking> bookings = bookingRepository.getBookingByBookDateBetween(
                Date.from(startOfDayFirstMonth.atZone(ZoneId.systemDefault()).toInstant()),
                Date.from(endOfDayLastMonth.atZone(ZoneId.systemDefault()).toInstant()));

        return bookings.stream()
                .flatMap(booking -> bookingConcessionRepository.getBookingConcessionsByBooking_Id(booking.getId()).stream())
                .mapToDouble(bookingConcession -> {
                    ConcessionProductDTO concessionProductDTO = concessionProductService.getConcessionProductById(bookingConcession.getConcessionProductID());
                    return concessionProductDTO.getPrice();
                }).sum();
    }

    private double getRevenueTicketByMonth(LocalDate firstDayOfMonth, LocalDate lastDayOfMonth) {
        LocalDateTime startOfDayFirstMonth = firstDayOfMonth.atStartOfDay();
        LocalDateTime endOfDayLastMonth = lastDayOfMonth.atTime(LocalTime.MAX);

        List<Booking> bookings = bookingRepository.getBookingByBookDateBetween(
                Date.from(startOfDayFirstMonth.atZone(ZoneId.systemDefault()).toInstant()),
                Date.from(endOfDayLastMonth.atZone(ZoneId.systemDefault()).toInstant()));

        return bookings.stream()
                .flatMap(booking -> ticketRepository.getTicketsByBooking_Id(booking.getId()).stream())
                .mapToDouble(Ticket::getPrice)
                .sum();
    }


}
