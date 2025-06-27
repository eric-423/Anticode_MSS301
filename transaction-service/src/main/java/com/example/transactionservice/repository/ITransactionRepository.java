package com.example.transactionservice.repository;

import com.example.transactionservice.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface ITransactionRepository extends JpaRepository<Transaction, Integer> {
    Transaction findTransactionById(int id);
    
    Transaction findTransactionByPaymentId(String paymentId);
    
    Transaction findTransactionByBookingId(int bookingId);

    @Query("SELECT COALESCE(SUM(t.amount), 0.0) FROM Transaction t WHERE t.transactionDate BETWEEN :startOfDay AND :endOfDay")
    Double sumRevenueBetweenDates(@Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);
}
