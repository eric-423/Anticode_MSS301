package com.mss301.anticode.cinema_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "ConcessionProducts")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ConcessionProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private int id;

    @Column(name = "product_name", nullable = false, unique = true)
    private String name;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "product_image_url")
    private String productImageUrl;

    @Column(name = "size", nullable = false)
    private String size;


}
