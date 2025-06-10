package com.example.transactionservice.controller;

import com.example.transactionservice.dto.TransactionDTO;
import com.example.transactionservice.service.serviceInterface.ITransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private ITransactionService transactionService;

    @PostMapping
    public ResponseEntity<?> createTransaction(@RequestBody TransactionDTO transactionDTO) {
        TransactionDTO createdTransaction = transactionService.createTransaction(transactionDTO);
        System.out.println("Created Transaction: " + createdTransaction);
        if (createdTransaction != null) {
            return ResponseEntity.ok(createdTransaction);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping
    public ResponseEntity<?> updateTransaction(@RequestBody TransactionDTO transactionDTO) {
        TransactionDTO updatedTransaction = transactionService.updateTransaction(transactionDTO);
        if (updatedTransaction != null) {
            return ResponseEntity.ok(updatedTransaction);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTransactionById(@PathVariable int id) {
        TransactionDTO transactionDTO = transactionService.getTransactionById(id);
        if (transactionDTO != null) {
            return ResponseEntity.ok(transactionDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteTransaction(int id) {
        boolean isDeleted = transactionService.deleteTransaction(id);
        if (isDeleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllTransactions() {
        List<TransactionDTO> transactions = transactionService.getAllTransactions();
        if (transactions != null && !transactions.isEmpty()) {
            return ResponseEntity.ok(transactions);
        } else {
            return ResponseEntity.noContent().build();
        }
    }
}
