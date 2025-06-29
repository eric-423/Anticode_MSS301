package com.spring.bookingservice.dtos;

import lombok.Data;

import java.io.Serializable;

@Data
public class GenreDTO implements Serializable {

    private int id;

    private String name;

}
