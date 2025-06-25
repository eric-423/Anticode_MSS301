package com.example.transactionservice.service.serviceImpl;

import com.example.transactionservice.dto.RevenueDTO;
import com.example.transactionservice.repository.ITransactionRepository;
import com.example.transactionservice.service.serviceInterface.IDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

@Service
public class DashboardService implements IDashboardService {

    @Autowired
    private ITransactionRepository transactionRepository;

    @Override
    public RevenueDTO getDailyRevenue(Date date) {
        LocalDate localDate = date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        Double revenue = transactionRepository
                .sumRevenueBetweenDates(localDate.atStartOfDay(), localDate.atTime(23, 59, 59, 999999999));
        RevenueDTO revenueDTO = new RevenueDTO();
        revenueDTO.setDate(date);
        revenueDTO.setRevenue(revenue);
        return revenueDTO;
    }
}
