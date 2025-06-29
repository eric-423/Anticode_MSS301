package com.spring.bookingservice.services.Impl;

import com.spring.bookingservice.dtos.enums.TicketStatus;
import com.spring.bookingservice.pojos.Ticket;
import com.spring.bookingservice.repositories.TicketRepository;
import com.spring.bookingservice.services.RedisHoldingSeatService;
import com.spring.bookingservice.services.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatServiceImpl implements SeatService {

    @Autowired
    private RedisHoldingSeatService redisHoldingSeatService;

    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public List<String> getUnavailableSeat(int showTimeId) {
        List<String> result = redisHoldingSeatService.getSeatsByShowTime(String.valueOf(showTimeId));
        List<Ticket> ticketSeats = ticketRepository.findByShowtimeAndStatus(showTimeId, TicketStatus.PAID);


        for(Ticket ticket : ticketSeats) {
            if(result.contains(ticket.getSeatName())) {
                continue;
            }
            result.add(ticket.getSeatName());
        }
        return result;
    }
}
