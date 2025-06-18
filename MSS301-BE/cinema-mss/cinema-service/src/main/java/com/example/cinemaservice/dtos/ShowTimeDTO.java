package com.example.cinemaservice.dtos;

import jakarta.persistence.Column;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class ShowTimeDTO implements Serializable {
    private int id;

    private Date startTime;

    private Date endTime;
}
