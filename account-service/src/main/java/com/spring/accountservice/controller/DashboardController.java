package com.spring.accountservice.controller;

import com.spring.accountservice.dto.CustomerNewDTO;
import com.spring.accountservice.service.Imp.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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
    private DashboardService dashboardService;

    @GetMapping("/weekly-customer-registration")
    public ResponseEntity<CustomerNewDTO> getWeeklyCustomerRegistration(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        return new ResponseEntity<>(dashboardService.getWeeklyCustomerRegister(date), HttpStatus.OK);
    }

    @GetMapping("/get-email-by-user-id")
    public ResponseEntity<String> getEmailByUserId(@RequestParam int userId) {
        return new ResponseEntity<>(dashboardService.getEmailByUserId(userId), HttpStatus.OK);
    }
}
