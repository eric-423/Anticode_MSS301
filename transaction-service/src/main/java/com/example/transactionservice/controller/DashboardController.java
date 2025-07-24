package com.example.transactionservice.controller;

import com.example.transactionservice.dto.RevenueDTO;
import com.example.transactionservice.dto.TransactionDTO;
import com.example.transactionservice.service.serviceInterface.IDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private IDashboardService dashboardService;


    @GetMapping("/daily-revenue")
    public ResponseEntity<RevenueDTO> getDailyRevenue(@RequestParam  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return new ResponseEntity<>(dashboardService.getDailyRevenue(date), HttpStatus.OK);
    }

    @GetMapping("/transaction-history")
    public ResponseEntity<List<TransactionDTO>> getTransactionHistory(@RequestParam(defaultValue = "0") int page,
                                                                      @RequestParam(defaultValue = "10") int size){
        return new ResponseEntity<>(dashboardService.getTransactionsHistory(page,size), HttpStatus.OK);
    }

    @GetMapping("/get-page-transaction-history")
    public ResponseEntity<Integer> getPageTransactionHistory(){
        return new ResponseEntity<>(dashboardService.getPageTransactionsHistory(), HttpStatus.OK);
    }
}
