package mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.entity.enums.PaymentMethods;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Transactions")
@Data
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private int id;

    @Column(name = "payment_method", nullable = false)
    private PaymentMethods paymentMethod;

    @Column(name = "amount", nullable = false)
    private double amount;

    @Column(name = "payment_status", nullable = false)
    private String paymentStatus;

    @Column(name = "transaction_date", nullable = false)
    private String transactionDate;

    @OneToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;
}
