package com.spring.bookingservice.services;

import com.spring.bookingservice.dtos.*;

import java.util.Date;
import java.util.List;

public interface DashboardService {
    TicketSoldDTO getDailyTicketsSold(Date date);
    ProductSoldDTO getDailyProductsSold(Date date);
    List<TicketRevenueDTO> getMonthlyTicketRevenue(Date date);
    List<ProductRevenueDTO> getMonthlyProductRevenue(Date date);
    List<MovieRevenueDTO> getMovieRevenueTop();
    List<BookingDTO> getOrderHistory(int page, int size);
    Integer getUserByBookingId(int bookingId);
    Integer getPageOrderHistory();
}
