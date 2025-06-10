package mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.service.serviceImpl;

import mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.dto.TransactionDTO;
import mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.entity.Booking;
import mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.entity.Transaction;
import mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.entity.enums.PaymentMethods;
import mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.entity.enums.PaymentStatus;
import mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.repository.IBookingRepository;
import mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.repository.ITransactionRepository;
import mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.service.serviceInterface.ITransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService implements ITransactionService {

    @Autowired
    private ITransactionRepository transactionRepository;

    @Autowired
    private IBookingRepository bookingRepository;

    @Override
    public TransactionDTO createTransaction(TransactionDTO transactionDTO) {
        // Convert TransactionDTO to Transaction entity
        Transaction transaction = new Transaction();
        transaction.setPaymentMethod(transactionDTO.getPaymentMethod());
        transaction.setAmount(transactionDTO.getAmount());
        transaction.setTransactionDate(transactionDTO.getTransactionDate());
        if(transactionDTO.getPaymentMethod() == PaymentMethods.BANK_TRANSFER)
            transaction.setPaymentStatus(PaymentStatus.PENDING); // Assuming bank transfers are initially pending
        else{
            transaction.setPaymentStatus(PaymentStatus.COMPLETED);
        }
        Booking booking = bookingRepository.findBookingById(transactionDTO.getBookingId());
        transaction.setBooking(booking);

        // Save the transaction entity to the database
        Transaction savedTransaction = transactionRepository.save(transaction);

        // Convert saved Transaction entity back to TransactionDTO
        TransactionDTO savedTransactionDTO = new TransactionDTO();
        savedTransactionDTO.setId(savedTransaction.getId());
        savedTransactionDTO.setPaymentMethod(savedTransaction.getPaymentMethod());
        savedTransactionDTO.setAmount(savedTransaction.getAmount());
        savedTransactionDTO.setTransactionDate(savedTransaction.getTransactionDate());
        savedTransactionDTO.setPaymentStatus(savedTransaction.getPaymentStatus());
        savedTransactionDTO.setBookingId(transactionDTO.getBookingId());

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


        // Update the transaction entity with new values
        transaction.setPaymentMethod(transactionDTO.getPaymentMethod());
        transaction.setAmount(transactionDTO.getAmount());
        transaction.setTransactionDate(transactionDTO.getTransactionDate());
        transaction.setPaymentStatus(transactionDTO.getPaymentStatus());
        Booking booking = bookingRepository.findBookingById(transactionDTO.getBookingId());
        transaction.setBooking(booking);
        // Save the updated transaction entity to the database
        Transaction updatedTransaction = transactionRepository.save(transaction);

        // Convert updated Transaction entity back to TransactionDTO
        TransactionDTO updatedTransactionDTO = new TransactionDTO();
        updatedTransactionDTO.setId(updatedTransaction.getId());
        updatedTransactionDTO.setPaymentMethod(updatedTransaction.getPaymentMethod());
        updatedTransactionDTO.setAmount(updatedTransaction.getAmount());
        updatedTransactionDTO.setTransactionDate(updatedTransaction.getTransactionDate());
        updatedTransactionDTO.setPaymentStatus(updatedTransaction.getPaymentStatus());
        updatedTransactionDTO.setBookingId(updatedTransaction.getBooking().getId());
        return updatedTransactionDTO;
    }

    @Override
    public boolean deleteTransaction(int transactionId) {
        Transaction transaction = transactionRepository.findTransactionById(transactionId);
        if (transaction == null ||
        (transaction.getPaymentStatus() != PaymentStatus.PENDING)) {
            return false; // or throw an exception
        }
        // Delete the transaction entity from the database
        transactionRepository.delete(transaction);
        return true;
    }

    @Override
    public TransactionDTO getTransactionById(int transactionId) {
        Transaction transaction = transactionRepository.findTransactionById(transactionId);
        if (transaction != null) {
            // Convert Transaction entity to TransactionDTO
            TransactionDTO transactionDTO = new TransactionDTO();
            transactionDTO.setId(transaction.getId());
            transactionDTO.setPaymentMethod(transaction.getPaymentMethod());
            transactionDTO.setPaymentStatus(transaction.getPaymentStatus());
            transactionDTO.setAmount(transaction.getAmount());
            transactionDTO.setTransactionDate(transaction.getTransactionDate());
            transactionDTO.setBookingId(transaction.getBooking().getId());
            return transactionDTO;
        }
        return null;
    }
}
