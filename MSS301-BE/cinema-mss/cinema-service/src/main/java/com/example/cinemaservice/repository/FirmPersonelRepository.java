package com.example.cinemaservice.repository;

import com.example.cinemaservice.entity.FilmPersonel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FirmPersonelRepository extends JpaRepository<FilmPersonel, Integer> {

}
