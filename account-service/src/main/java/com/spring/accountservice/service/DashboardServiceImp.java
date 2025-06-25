package com.spring.accountservice.service;

import com.spring.accountservice.dto.CustomerNewDTO;
import com.spring.accountservice.repository.UserRepository;
import com.spring.accountservice.service.Imp.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;

@Service
public class DashboardServiceImp implements DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public CustomerNewDTO getWeeklyCustomerRegister(Date date) {
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate monday = localDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDateTime startOfWeek = monday.atStartOfDay();
        LocalDateTime endOfWeek = monday.plusWeeks(1).atStartOfDay();
        CustomerNewDTO customerNewDTO = new CustomerNewDTO();
        customerNewDTO.setDate(date);
        customerNewDTO.setNumber(userRepository.countByRegistrationDateBetween(startOfWeek,endOfWeek));
        return customerNewDTO;
    }
}
