package com.example.cinemaservice.dtos;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class MovieDTO implements Serializable {

    private Integer id;
    private String title;
    private String synopsis;
    private List<GenreDTO> genres;
    private Integer duration;
    private Integer ageRanging;
    private String status;
    private String imageUrl;
    List<FilmPersonelDTO> personels;

}
