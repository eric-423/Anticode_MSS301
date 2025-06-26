package com.example.transactionservice.service.serviceInterface;

import com.example.transactionservice.dto.TransactionDTO;
import com.example.transactionservice.dto.enums.PaymentStatus;

import java.util.List;

public interface ITransactionService {
    TransactionDTO createTransaction(TransactionDTO transactionDTO);
    TransactionDTO updateTransaction(TransactionDTO transactionDTO);
    boolean deleteTransaction(int transactionId);
    TransactionDTO getTransactionById(int transactionId);
    TransactionDTO getTransactionByBookingId(int bookingId);
    List<TransactionDTO> getAllTransactions();
    
    TransactionDTO updateTransactionPaymentStatus(int transactionId, PaymentStatus newStatus);
}
