package mss301.galaxycine.galaxy.cine.userservice.repository;

import mss301.galaxycine.galaxy.cine.userservice.entity.VerifyToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface VerifyTokenRepository extends JpaRepository<VerifyToken, Integer> {
    VerifyToken findByToken(String token);

}
