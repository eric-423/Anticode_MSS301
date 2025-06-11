package mss301.galaxycine.galaxy.cine.userservice.repository;

import mss301.galaxycine.galaxy.cine.userservice.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByEmail(String email);
}
