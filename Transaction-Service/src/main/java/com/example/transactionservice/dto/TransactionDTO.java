package com.example.transactionservice.dto;

import com.example.transactionservice.entity.enums.PaymentMethods;
import com.example.transactionservice.entity.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDTO implements Serializable {
    //id, paymentMethod, amount, transactionDate, bookingId
    private int id;
    private PaymentMethods paymentMethod;
    private double amount;
    private String transactionDate;
    private PaymentStatus paymentStatus;
}
