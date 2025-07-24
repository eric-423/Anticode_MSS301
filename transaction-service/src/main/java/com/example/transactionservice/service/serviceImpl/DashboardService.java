package com.example.transactionservice.service.serviceImpl;

import com.example.transactionservice.dto.RevenueDTO;
import com.example.transactionservice.dto.TransactionDTO;
import com.example.transactionservice.entity.Transaction;
import com.example.transactionservice.repository.ITransactionRepository;
import com.example.transactionservice.service.serviceInterface.BookingService;
import com.example.transactionservice.service.serviceInterface.IDashboardService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService implements IDashboardService {

    @Autowired
    private ITransactionRepository transactionRepository;

    @Autowired
    private BookingService bookingService;

    @Override
    public RevenueDTO getDailyRevenue(LocalDate date) {
        Double revenue = transactionRepository
                .sumRevenueBetweenDates(date.atStartOfDay(), date.atTime(23, 59, 59, 999999999));
        RevenueDTO revenueDTO = new RevenueDTO();
        revenueDTO.setRevenue(revenue);
        return revenueDTO;
    }

    @Override
    public List<TransactionDTO> getTransactionsHistory(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Transaction> transactions = transactionRepository.findAll(pageable);
        return transactions.stream().map(this::convertToTransactionDTO).collect(Collectors.toList());
    }

    @Override
    public Integer getPageTransactionsHistory() {
        return (int) Math.ceil((double) transactionRepository.count() / 10);
    }

    private TransactionDTO convertToTransactionDTO(Transaction transaction) {
        TransactionDTO transactionDTO = new TransactionDTO();
        BeanUtils.copyProperties(transaction, transactionDTO);
        transactionDTO.setUserId(bookingService.getUserByBookingId(transaction.getBookingId()));
        return transactionDTO;
    }

}
