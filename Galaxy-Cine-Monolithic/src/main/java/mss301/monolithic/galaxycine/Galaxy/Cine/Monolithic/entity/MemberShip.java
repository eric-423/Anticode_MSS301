package mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Table(name = "MemberShip")
@Entity
@Data
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
