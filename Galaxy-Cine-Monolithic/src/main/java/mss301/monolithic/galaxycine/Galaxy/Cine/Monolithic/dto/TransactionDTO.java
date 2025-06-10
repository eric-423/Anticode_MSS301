package mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.entity.enums.PaymentMethods;
import mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.entity.enums.PaymentStatus;

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
    private int bookingId;
}
