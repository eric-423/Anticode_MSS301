package com.example.transactionservice.repository;

import com.example.transactionservice.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITransactionRepository extends JpaRepository<Transaction, Integer> {
    Transaction findTransactionById(int id);
}
