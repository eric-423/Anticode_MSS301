package com.example.transactionservice.controller;

import com.example.transactionservice.dto.RevenueDTO;
import com.example.transactionservice.service.serviceInterface.IDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private IDashboardService dashboardService;


    @GetMapping("/daily-revenue")
    public ResponseEntity<RevenueDTO> getDailyRevenue(@RequestParam Date date) {
        return new ResponseEntity<>(dashboardService.getDailyRevenue(date), HttpStatus.OK);
    }
}
