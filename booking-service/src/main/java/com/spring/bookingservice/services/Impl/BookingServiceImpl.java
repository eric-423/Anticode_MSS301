package com.spring.bookingservice.services.Impl;

import com.spring.bookingservice.dtos.*;
import com.spring.bookingservice.dtos.enums.BookingStatus;
import com.spring.bookingservice.dtos.enums.TicketStatus;
import com.spring.bookingservice.kafka.BookingProducer;
import com.spring.bookingservice.pojos.Booking;
import com.spring.bookingservice.pojos.BookingConcession;
import com.spring.bookingservice.pojos.Ticket;
import com.spring.bookingservice.repositories.BookingRepository;
import com.spring.bookingservice.repositories.TicketRepository;
import com.spring.bookingservice.services.BookingService;
import com.spring.bookingservice.services.MovieService;
import com.spring.bookingservice.services.RedisHoldingSeatService;
import com.spring.bookingservice.services.ShowTimeService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private BookingProducer bookingProducer;

    @Autowired
    private RedisHoldingSeatService redisHoldingSeatService;

    @Autowired
    private MovieService movieService;

    @Autowired
    private ShowTimeService showTimeService;

    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public BookingDTO getBooking(int id) {
        try {
            return convertBookingToBookingDTO(bookingRepository.getBookingById(id));
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<BookingDTO> getBookings() {
        try {
            List<Booking> bookings = bookingRepository.findAll();
            List<BookingDTO> bookingDTOs = new ArrayList<>();
            bookings.forEach(booking -> {
                bookingDTOs.add(convertBookingToBookingDTO(booking));
            });
            return bookingDTOs;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        Booking booking = new Booking();
        bookingDTO.setId(booking.getId());
        BeanUtils.copyProperties(bookingDTO, booking);
        booking.setBookingStatus(BookingStatus.PENDING);
        List<BookingConcession> bookingConcessions = new ArrayList<>();

        for (BookingConcessionDTO bookingConcessionDTO : bookingDTO.getBookingConcessionList()) {
            BookingConcession bookingConcession = new BookingConcession();
            BeanUtils.copyProperties(bookingConcessionDTO, bookingConcession);
            bookingConcession.setBooking(booking);
            bookingConcessions.add(bookingConcession);
        }

        booking.setBookingConcessionList(bookingConcessions);

        List<Ticket> tickets = new ArrayList<>();

        for (TicketDTO bookingSeatDTO : bookingDTO.getBookingSeatList()) {
            Ticket ticket = new Ticket();
            BeanUtils.copyProperties(bookingSeatDTO, ticket);
            ticket.setBooking(booking);
            ticket.setStatus(TicketStatus.PENDING);
            tickets.add(ticket);
        }


        booking.setBookingSeatList(tickets);


        for (Ticket ticket : booking.getBookingSeatList()) {
            redisHoldingSeatService.holdSeat(new SeatHoldInfo(ticket.getShowtime() + "", ticket.getSeatName()));
        }

        BookingDTO saved = convertBookingToBookingDTO(bookingRepository.save(booking));
        bookingProducer.publishBookingCreated(saved);
        return saved;
    }

    @Override
    public BookingDTO updateBooking(int id, BookingDTO bookingDTO) {
        Booking booking = bookingRepository.getBookingById(id);
        BeanUtils.copyProperties(bookingDTO, booking);

        booking.getBookingConcessionList().clear();
        bookingDTO.getBookingConcessionList().forEach(concessionDTO -> {
            BookingConcession newConcession = new BookingConcession();
            BeanUtils.copyProperties(concessionDTO, newConcession);
            newConcession.setBooking(booking);
            booking.getBookingConcessionList().add(newConcession);
        });

        booking.getBookingSeatList().clear();
        bookingDTO.getBookingSeatList().forEach(ticketDTO -> {
            Ticket newTicket = new Ticket();
            BeanUtils.copyProperties(ticketDTO, newTicket);
            newTicket.setBooking(booking);
            booking.getBookingSeatList().add(newTicket);
        });

        return convertBookingToBookingDTO(bookingRepository.save(booking));
    }

    @Override
    public boolean deleteBooking(int id) {
        try {
            bookingRepository.deleteById(id);
            return true;
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }


    @Override
    public List<BookingCustomerDTO> getBookingsByCustomerId(int customerId) {
        try {
            List<Booking> bookings = bookingRepository.findByUserID(customerId);
            List<BookingCustomerDTO> bookingCustomerDTOs = new ArrayList<>();

            for (Booking booking : bookings) {
                bookingCustomerDTOs.add(convertBookingToBookingCustomerDTO(booking));
            }

            return bookingCustomerDTOs;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return List.of();
    }

    @Override
    public BookingCustomerDTO getBookingByIdForCustomer(int id) {
        try {
            Booking booking = bookingRepository.getBookingById(id);
            if (booking != null) {
                return convertBookingToBookingCustomerDTO(booking);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private BookingCustomerDTO convertBookingToBookingCustomerDTO(Booking booking) {
        BookingCustomerDTO bookingCustomerDTO = new BookingCustomerDTO();
        MovieDTO movieDTO = movieService.getMovieByTicket(booking.getBookingSeatList().get(0).getId());
        bookingCustomerDTO.setBookingId(booking.getId());
        bookingCustomerDTO.setMovieName(movieDTO.getTitle());
        bookingCustomerDTO.setBookingStatus(booking.getBookingStatus().toString());
        bookingCustomerDTO.setBookingDate(booking.getBookDate());

        List<Ticket> tickets = booking.getBookingSeatList();
        List<String> seatNumbers = new ArrayList<>();

        for(Ticket ticket : tickets) {
            seatNumbers.add(ticket.getSeatName());
        }
        int showTimeId = tickets.get(0).getShowtime();
        ShowTimeDTO showTimeDTO = showTimeService.getShowtimeByIdTransfer(showTimeId);
        bookingCustomerDTO.setShowTime(showTimeDTO.getStartTime());
        bookingCustomerDTO.setSeatNumbers(seatNumbers);
        bookingCustomerDTO.setTotalPrice(booking.getTotalPrice());
        bookingCustomerDTO.setCinemaName("GALAXY FPT");

        return bookingCustomerDTO;
    }


    private BookingDTO convertBookingToBookingDTO(Booking bookingReturn) {
        BookingDTO bookingDTOReturn = new BookingDTO();
        BeanUtils.copyProperties(bookingReturn, bookingDTOReturn);
        List<BookingConcessionDTO> bookingConcessionDTOSReturn = new ArrayList<>();
        bookingReturn.getBookingConcessionList().forEach(bookingConcessionDTO -> {
            BookingConcessionDTO bookingConcessionDTOReturn = new BookingConcessionDTO();
            BeanUtils.copyProperties(bookingConcessionDTO, bookingConcessionDTOReturn);
            bookingConcessionDTOSReturn.add(bookingConcessionDTOReturn);
        });
        List<TicketDTO> ticketDTOsReturn = new ArrayList<>();
        bookingReturn.getBookingSeatList().forEach(bookingSeatDTO -> {
            TicketDTO ticketDTO = new TicketDTO();
            BeanUtils.copyProperties(bookingSeatDTO, ticketDTO);
            ticketDTOsReturn.add(ticketDTO);
        });
        bookingDTOReturn.setBookingSeatList(ticketDTOsReturn);
        bookingDTOReturn.setBookingConcessionList(bookingConcessionDTOSReturn);
        return bookingDTOReturn;
    }
}
