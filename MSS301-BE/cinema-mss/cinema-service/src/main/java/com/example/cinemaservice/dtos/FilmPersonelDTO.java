package com.example.cinemaservice.dtos;

import lombok.Data;

import java.util.Date;

@Data
public class FilmPersonelDTO {
    private int id;

    private String name;

    private String imageUrl;

    private Date dateOfBirth;

    private String role;
}
