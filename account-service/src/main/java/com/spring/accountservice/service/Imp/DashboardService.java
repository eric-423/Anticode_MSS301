package com.spring.accountservice.service.Imp;

import com.spring.accountservice.dto.CustomerNewDTO;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;

public interface DashboardService {
    public CustomerNewDTO getWeeklyCustomerRegister(Date date);
    public String getEmailByUserId(int userId);
}
