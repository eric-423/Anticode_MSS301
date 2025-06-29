package com.example.transactionservice.service.serviceInterface;

import com.example.transactionservice.dto.RevenueDTO;

import java.time.LocalDate;
import java.util.Date;

public interface IDashboardService {
   RevenueDTO getDailyRevenue(LocalDate date);
}
