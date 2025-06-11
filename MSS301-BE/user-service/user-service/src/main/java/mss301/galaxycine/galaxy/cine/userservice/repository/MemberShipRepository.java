package mss301.galaxycine.galaxy.cine.userservice.repository;

import mss301.galaxycine.galaxy.cine.userservice.entity.MemberShip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MemberShipRepository extends JpaRepository<MemberShip, Integer> {
    MemberShip findByNameIgnoreCase(String name);

}
