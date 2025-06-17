package com.example.cinemaservice.dtos;

import com.example.cinemaservice.entity.Movie;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToMany;
import lombok.Data;

import java.io.Serializable;
import java.util.Set;

@Data
public class GenreDTO implements Serializable {

    private int id;

    private String name;

}
