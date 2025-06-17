package com.example.userservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Table(name = "Member_ship")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberShip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "membership_id")
    private int id;

    @Column(name = "membership_name", nullable = false, unique = true)
    private String name;

    @Column(name = "min_point")
    private int minPoint;

    @OneToMany(mappedBy = "memberShip", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Users> users;
}

