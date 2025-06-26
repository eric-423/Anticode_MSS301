package com.example.transactionservice.service.serviceImpl;

import com.example.transactionservice.dto.TransactionDTO;
import com.example.transactionservice.dto.enums.PaymentMethods;
import com.example.transactionservice.dto.enums.PaymentStatus;
import com.example.transactionservice.entity.Transaction;
import com.example.transactionservice.repository.ITransactionRepository;
import com.example.transactionservice.service.serviceInterface.ITransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransactionService implements ITransactionService {

    @Autowired
    private ITransactionRepository transactionRepository;

    @Override
    public TransactionDTO createTransaction(TransactionDTO transactionDTO) {
        Transaction transaction = new Transaction();
        transaction.setPaymentMethod(transactionDTO.getPaymentMethod());
        transaction.setAmount(transactionDTO.getAmount());
        transaction.setTransactionDate(transactionDTO.getTransactionDate());
        transaction.setBookingId(transactionDTO.getBookingId());
        transaction.setPaymentId(transactionDTO.getPaymentId());
        transaction.setOrderCode(transactionDTO.getOrderCode());
        
        if (transactionDTO.getPaymentMethod() == PaymentMethods.BANK_TRANSFER)
            transaction.setPaymentStatus(PaymentStatus.PENDING);
        else {
            transaction.setPaymentStatus(PaymentStatus.PENDING);
        }
        Transaction savedTransaction = transactionRepository.save(transaction);

        TransactionDTO savedTransactionDTO = new TransactionDTO();
        savedTransactionDTO.setId(savedTransaction.getId());
        savedTransactionDTO.setPaymentMethod(savedTransaction.getPaymentMethod());
        savedTransactionDTO.setAmount(savedTransaction.getAmount());
        savedTransactionDTO.setTransactionDate(savedTransaction.getTransactionDate());
        savedTransactionDTO.setPaymentStatus(savedTransaction.getPaymentStatus());
        savedTransactionDTO.setBookingId(savedTransaction.getBookingId());
        savedTransactionDTO.setPaymentId(savedTransaction.getPaymentId());
        savedTransactionDTO.setOrderCode(savedTransaction.getOrderCode());

        return savedTransactionDTO;
    }

    @Override
    public TransactionDTO updateTransaction(TransactionDTO transactionDTO) {
        Transaction transaction = transactionRepository.findTransactionById(transactionDTO.getId());
        if (transaction == null ||
                (transaction.getPaymentStatus() == PaymentStatus.FAILED ||
                        transaction.getPaymentStatus() == PaymentStatus.CANCELLED)) {
            return null;
        }


        transaction.setPaymentMethod(transactionDTO.getPaymentMethod());
        transaction.setAmount(transactionDTO.getAmount());
        transaction.setTransactionDate(transactionDTO.getTransactionDate());
        transaction.setPaymentStatus(transactionDTO.getPaymentStatus());

        Transaction updatedTransaction = transactionRepository.save(transaction);

        TransactionDTO updatedTransactionDTO = new TransactionDTO();
        updatedTransactionDTO.setId(updatedTransaction.getId());
        updatedTransactionDTO.setPaymentMethod(updatedTransaction.getPaymentMethod());
        updatedTransactionDTO.setAmount(updatedTransaction.getAmount());
        updatedTransactionDTO.setTransactionDate(updatedTransaction.getTransactionDate());
        updatedTransactionDTO.setPaymentStatus(updatedTransaction.getPaymentStatus());
        updatedTransactionDTO.setBookingId(updatedTransaction.getBookingId());
        return updatedTransactionDTO;
    }

    @Override
    public boolean deleteTransaction(int transactionId) {
        Transaction transaction = transactionRepository.findTransactionById(transactionId);
        if (transaction == null ||
                (transaction.getPaymentStatus() != PaymentStatus.PENDING)) {
            return false;
        }
        transactionRepository.delete(transaction);
        return true;
    }

    @Override
    public TransactionDTO getTransactionById(int transactionId) {
        Transaction transaction = transactionRepository.findTransactionById(transactionId);
        if (transaction != null) {
            TransactionDTO transactionDTO = new TransactionDTO();
            transactionDTO.setId(transaction.getId());
            transactionDTO.setPaymentMethod(transaction.getPaymentMethod());
            transactionDTO.setPaymentStatus(transaction.getPaymentStatus());
            transactionDTO.setAmount(transaction.getAmount());
            transactionDTO.setTransactionDate(transaction.getTransactionDate());
            transactionDTO.setBookingId(transaction.getBookingId());

            return transactionDTO;
        }
        return null;
    }

    @Override
    public TransactionDTO getTransactionByBookingId(int bookingId) {
        Transaction transaction = transactionRepository.findTransactionByBookingId(bookingId);
        if (transaction != null) {
            TransactionDTO transactionDTO = new TransactionDTO();
            transactionDTO.setId(transaction.getId());
            transactionDTO.setPaymentMethod(transaction.getPaymentMethod());
            transactionDTO.setPaymentStatus(transaction.getPaymentStatus());
            transactionDTO.setAmount(transaction.getAmount());
            transactionDTO.setTransactionDate(transaction.getTransactionDate());
            transactionDTO.setBookingId(transaction.getBookingId());
            transactionDTO.setPaymentId(transaction.getPaymentId());
            transactionDTO.setOrderCode(transaction.getOrderCode());

            return transactionDTO;
        }
        return null;
    }

    @Override
    public List<TransactionDTO> getAllTransactions() {
        List<Transaction> transactions = transactionRepository.findAll();
        List<TransactionDTO> result = new ArrayList<>();
        if (!transactions.isEmpty()) {
            for (Transaction transaction : transactions) {
                TransactionDTO transactionDTO = new TransactionDTO();
                transactionDTO.setId(transaction.getId());
                transactionDTO.setPaymentMethod(transaction.getPaymentMethod());
                transactionDTO.setPaymentStatus(transaction.getPaymentStatus());
                transactionDTO.setAmount(transaction.getAmount());
                transactionDTO.setTransactionDate(transaction.getTransactionDate());
                transactionDTO.setBookingId(transaction.getBookingId());
                result.add(transactionDTO);
            }
            return result;
        }
        return null;
    }

    @Override
    public TransactionDTO updateTransactionPaymentStatus(int transactionId, PaymentStatus newStatus) {
        Transaction transaction = transactionRepository.findTransactionById(transactionId);
        if (transaction == null) {
            return null;
        }

        transaction.setPaymentStatus(newStatus);
        transaction.setTransactionDate(java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ISO_DATE_TIME));

        Transaction updatedTransaction = transactionRepository.save(transaction);

        TransactionDTO updatedTransactionDTO = new TransactionDTO();
        updatedTransactionDTO.setId(updatedTransaction.getId());
        updatedTransactionDTO.setPaymentMethod(updatedTransaction.getPaymentMethod());
        updatedTransactionDTO.setAmount(updatedTransaction.getAmount());
        updatedTransactionDTO.setTransactionDate(updatedTransaction.getTransactionDate());
        updatedTransactionDTO.setPaymentStatus(updatedTransaction.getPaymentStatus());
        updatedTransactionDTO.setBookingId(updatedTransaction.getBookingId());
        updatedTransactionDTO.setPaymentId(updatedTransaction.getPaymentId());
        updatedTransactionDTO.setOrderCode(updatedTransaction.getOrderCode());
        
        return updatedTransactionDTO;
    }


}
