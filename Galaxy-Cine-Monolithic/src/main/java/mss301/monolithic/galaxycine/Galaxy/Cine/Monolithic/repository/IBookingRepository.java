package mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.repository;

import mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBookingRepository extends JpaRepository<Booking, Integer> {
    Booking findBookingById(int bookingId);
}
