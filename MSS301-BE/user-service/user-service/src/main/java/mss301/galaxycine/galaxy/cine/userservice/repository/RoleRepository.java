package mss301.galaxycine.galaxy.cine.userservice.repository;

import mss301.galaxycine.galaxy.cine.userservice.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findByNameIgnoreCase(String name);

}
