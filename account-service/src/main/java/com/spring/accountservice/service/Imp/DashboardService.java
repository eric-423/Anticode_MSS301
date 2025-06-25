package com.spring.accountservice.service.Imp;

import com.spring.accountservice.dto.CustomerNewDTO;

import java.util.Date;

public interface DashboardService {
    public CustomerNewDTO getWeeklyCustomerRegister(Date date);
}
