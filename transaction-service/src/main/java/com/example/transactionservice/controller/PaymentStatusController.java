package com.example.transactionservice.controller;

import com.example.transactionservice.dto.PaymentStatusUpdateDTO;
import com.example.transactionservice.dto.TransactionDTO;
import com.example.transactionservice.dto.enums.PaymentStatus;
import com.example.transactionservice.kafka.PaymentStatusUpdateProducer;
import com.example.transactionservice.service.serviceInterface.ITransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment-status")
public class PaymentStatusController {

    @Autowired
    private ITransactionService transactionService;

    @Autowired
    private PaymentStatusUpdateProducer paymentStatusUpdateProducer;

    @PostMapping("/update")
    public ResponseEntity<String> updatePaymentStatus(@RequestBody PaymentStatusUpdateDTO paymentStatusUpdateDTO) {
        try {
            TransactionDTO updatedTransaction = transactionService.updateTransactionPaymentStatus(
                paymentStatusUpdateDTO.getTransactionId(), 
                paymentStatusUpdateDTO.getPaymentStatus()
            );

            if (updatedTransaction != null) {
                paymentStatusUpdateProducer.publishPaymentStatusUpdate(paymentStatusUpdateDTO);
                return ResponseEntity.ok("Payment status updated successfully");
            } else {
                return ResponseEntity.badRequest().body("Transaction not found or cannot be updated");
            }

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error updating payment status: " + e.getMessage());
        }
    }

    
} 