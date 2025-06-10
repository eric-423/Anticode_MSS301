package mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.service.serviceInterface;

import mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.dto.TransactionDTO;

public interface ITransactionService {
    //CRUD transaction
    TransactionDTO createTransaction(TransactionDTO transactionDTO);
    TransactionDTO updateTransaction(TransactionDTO transactionDTO);
    boolean deleteTransaction(int transactionId);
    TransactionDTO getTransactionById(int transactionId);
}
