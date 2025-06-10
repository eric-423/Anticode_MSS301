package mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.repository;

import mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITransactionRepository extends JpaRepository<Transaction, Integer> {
    Transaction findTransactionById(int id);
}
