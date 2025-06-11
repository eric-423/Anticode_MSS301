package com.spring.bookingservice.services.Impl;

import com.spring.bookingservice.dtos.BookingConcessionDTO;
import com.spring.bookingservice.pojos.BookingConcession;
import com.spring.bookingservice.repositories.BookingConcessionRepository;
import com.spring.bookingservice.services.BookingConcessionsService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingConcessionsServiceImpl implements BookingConcessionsService {

    @Autowired
    private BookingConcessionRepository bookingConcessionRepository;

    @Override
    public BookingConcessionDTO getBookingConcession(int id) {
        BookingConcession bookingConcession = bookingConcessionRepository.getBookingConcessionById(id);
        BookingConcessionDTO BookingConcessionDTO = new BookingConcessionDTO();
        BeanUtils.copyProperties(bookingConcession, BookingConcessionDTO);
        return BookingConcessionDTO;
    }

    @Override
    public List<BookingConcessionDTO> getBookingConcessions() {
        List<BookingConcession> bookingConcessions = bookingConcessionRepository.findAll();
        List<BookingConcessionDTO> BookingConcessionDTOs = new ArrayList<>();
        bookingConcessions.forEach(bookingConcession -> {
            BookingConcessionDTO BookingConcessionDTO = new BookingConcessionDTO();
            BeanUtils.copyProperties(bookingConcession, BookingConcessionDTO);
            BookingConcessionDTOs.add(BookingConcessionDTO);
        });
        return BookingConcessionDTOs;
    }
}
