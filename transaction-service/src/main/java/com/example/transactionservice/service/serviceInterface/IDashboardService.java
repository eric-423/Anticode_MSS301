package com.example.transactionservice.service.serviceInterface;

import com.example.transactionservice.dto.RevenueDTO;
import com.example.transactionservice.dto.TransactionDTO;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface IDashboardService {
   RevenueDTO getDailyRevenue(LocalDate date);
   List<TransactionDTO> getTransactionsHistory(int page, int size);
}
