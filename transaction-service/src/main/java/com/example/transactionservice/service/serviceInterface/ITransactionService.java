package com.example.transactionservice.service.serviceInterface;


import com.example.transactionservice.dto.TransactionDTO;

import java.util.List;

public interface ITransactionService {
    //CRUD transaction
    TransactionDTO createTransaction(TransactionDTO transactionDTO);

    TransactionDTO updateTransaction(TransactionDTO transactionDTO);

    boolean deleteTransaction(int transactionId);

    TransactionDTO getTransactionById(int transactionId);

    List<TransactionDTO> getAllTransactions();
}
