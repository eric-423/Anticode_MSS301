package com.example.transactionservice.kafka;

import com.example.transactionservice.dto.TransactionDTO;
import com.example.transactionservice.dto.enums.PaymentStatus;
import com.example.transactionservice.service.serviceInterface.ITransactionService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentStatusUpdateConsumer {

    private final ITransactionService transactionService;

    public PaymentStatusUpdateConsumer(ITransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @KafkaListener(topics = "${app.kafka.payment-topic:payment-events}", 
                   groupId = "transaction-service",
                   containerFactory = "transactionKafkaListenerContainerFactory")
    public void handlePaymentStatusUpdate(TransactionDTO dto) {
        System.out.println("=== PaymentStatusUpdateConsumer ===");
        System.out.println("Received payment status update: " + dto);
        System.out.println("BookingId: " + dto.getBookingId());
        System.out.println("PaymentStatus: " + dto.getPaymentStatus());
        
        try {
            TransactionDTO transaction = transactionService.getTransactionByBookingId(dto.getBookingId());
            
            if (transaction != null) {
                System.out.println("Found transaction with ID: " + transaction.getId());
                System.out.println("Current status: " + transaction.getPaymentStatus());
                System.out.println("Updating to status: " + dto.getPaymentStatus());

                TransactionDTO updatedTransaction = transactionService.updateTransactionPaymentStatus(
                    transaction.getId(), 
                    dto.getPaymentStatus()
                );
                
                if (updatedTransaction != null) {
                    System.out.println("Successfully updated transaction: " + updatedTransaction);
                    System.out.println("New status: " + updatedTransaction.getPaymentStatus());
                } else {
                    System.out.println("Failed to update transaction");
                }
            } else {
                System.out.println("Transaction not found for bookingId: " + dto.getBookingId());
                List<TransactionDTO> allTransactions = transactionService.getAllTransactions();
                if (allTransactions != null) {
                    System.out.println("Available bookingIds: " + 
                        allTransactions.stream()
                            .map(t -> String.valueOf(t.getBookingId()))
                            .reduce("", (a, b) -> a + ", " + b));
                }
            }
        } catch (Exception e) {
            System.err.println("Error processing payment status update: " + e.getMessage());
            e.printStackTrace();
        }
        System.out.println("=== End PaymentStatusUpdateConsumer ===");
    }
} 