package com.example.cinemaservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @Column(name = "is_available", nullable = false)
    private boolean isAvailable = true;
}
