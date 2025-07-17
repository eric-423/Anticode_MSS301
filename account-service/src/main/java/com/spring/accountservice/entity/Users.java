package com.spring.accountservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "Users")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "phone_number", nullable = false, unique = true)
    private String phoneNumber;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "royal_point", nullable = false)
    private int royalPoint;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "email_verified", nullable = false)
    private boolean emailVerified = false;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "membership_id", nullable = true)
    private MemberShip memberShip;

    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;

}
