package com.spring.bookingservice.services.Impl;

import com.spring.bookingservice.dtos.*;
import com.spring.bookingservice.pojos.Booking;
import com.spring.bookingservice.pojos.Ticket;
import com.spring.bookingservice.repositories.BookingConcessionRepository;
import com.spring.bookingservice.repositories.BookingRepository;
import com.spring.bookingservice.repositories.TicketRepository;
import com.spring.bookingservice.services.ConcessionProductService;
import com.spring.bookingservice.services.DashboardService;
import com.spring.bookingservice.services.MovieService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
        IntStream.range(1, 13).forEach(month -> {
            LocalDate firstDayOfMonth = LocalDate.of(year, month, 1);
            TicketRevenueDTO ticketRevenueDTO = new TicketRevenueDTO();
            ticketRevenueDTO.setMonth(month);
            ticketRevenueDTO.setRevenue(getRevenueTicketByMonth(firstDayOfMonth, firstDayOfMonth.with(TemporalAdjusters.lastDayOfMonth())));
            result.add(ticketRevenueDTO);
        });
        return result;
    }

    @Override
    public List<ProductRevenueDTO> getMonthlyProductRevenue(Date date) {
        List<ProductRevenueDTO> result = new ArrayList<>();
        int year = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getYear();
        IntStream.range(1, 13).forEach(month -> {
            LocalDate firstDayOfMonth = LocalDate.of(year, month, 1);
            ProductRevenueDTO productRevenueDTO = new ProductRevenueDTO();
            productRevenueDTO.setMonth(month);
            productRevenueDTO.setRevenue(getRevenueProductByMonth(firstDayOfMonth, firstDayOfMonth.with(TemporalAdjusters.lastDayOfMonth())));
            result.add(productRevenueDTO);
        });
        return result;
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
            if(movieRevenueDTO.getRevenue() > 0) movieRevenueDTOS.add(movieRevenueDTO);
        });
        return movieRevenueDTOS.stream()
                .sorted(Comparator.comparingDouble(MovieRevenueDTO::getRevenue).reversed())
                .limit(4)
                .toList();
    }

    @Override
    public List<BookingDTO> getOrderHistory(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Booking> bookings = bookingRepository.findAll(pageable);
        return bookings.stream().map(this::convertBookingToBookingDTO).collect(Collectors.toList());
    }

    @Override
    public Integer getUserByBookingId(int bookingId) {
        return  bookingRepository.getBookingById(bookingId).getUserID();
    }

    @Override
    public Integer getPageOrderHistory() {
        return (int) Math.ceil((double) bookingRepository.count() / 10);
    }

    private double getRevenueProductByMonth(LocalDate firstDayOfMonth, LocalDate lastDayOfMonth) {
        LocalDateTime startOfDayFirstMonth = firstDayOfMonth.atStartOfDay();
        LocalDateTime endOfDayLastMonth = lastDayOfMonth.atTime(LocalTime.MAX);

        List<Booking> bookings = bookingRepository.getBookingByBookDateBetween(
                Date.from(startOfDayFirstMonth.atZone(ZoneId.systemDefault()).toInstant()),
                Date.from(endOfDayLastMonth.atZone(ZoneId.systemDefault()).toInstant()));

        return bookings.stream()
                .flatMap(booking ->
                    bookingConcessionRepository.getBookingConcessionsByBooking_Id(booking.getId()).stream()
                )
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
                .mapToDouble(
                      Ticket::getPrice
                )
                .sum();
    }


    private BookingDTO convertBookingToBookingDTO(Booking bookingReturn) {
        BookingDTO bookingDTOReturn = new BookingDTO();
        BeanUtils.copyProperties(bookingReturn, bookingDTOReturn);
        List<BookingConcessionDTO> bookingConcessionDTOSReturn = new ArrayList<>();
        bookingReturn.getBookingConcessionList().forEach(bookingConcessionDTO -> {
            BookingConcessionDTO bookingConcessionDTOReturn = new BookingConcessionDTO();
            BeanUtils.copyProperties(bookingConcessionDTO, bookingConcessionDTOReturn);
            bookingConcessionDTOReturn.setConcessionName(concessionProductService.getConcessionProductById(bookingConcessionDTO.getConcessionProductID()).getName());
            bookingConcessionDTOSReturn.add(bookingConcessionDTOReturn);
        });
        List<TicketDTO> ticketDTOsReturn = new ArrayList<>();
        bookingReturn.getBookingSeatList().forEach(bookingSeatDTO -> {
            TicketDTO ticketDTO = new TicketDTO();
            BeanUtils.copyProperties(bookingSeatDTO, ticketDTO);
            ticketDTOsReturn.add(ticketDTO);
        });
        bookingDTOReturn.setFilm(movieService.getMovieByShowtimeID(bookingReturn.getBookingSeatList().getFirst().getShowtime()).getTitle());

        bookingDTOReturn.setBookingSeatList(ticketDTOsReturn);
        bookingDTOReturn.setBookingConcessionList(bookingConcessionDTOSReturn);
        return bookingDTOReturn;
    }


}
