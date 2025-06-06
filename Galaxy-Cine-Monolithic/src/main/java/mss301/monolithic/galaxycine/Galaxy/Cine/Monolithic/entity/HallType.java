package mss301.monolithic.galaxycine.Galaxy.Cine.Monolithic.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "HallTypes")
public class HallType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "type_id")
    private int id;

    @Column(name = "type_name", nullable = false, unique = true)
    private String name;

    @Column(name = "row_count", nullable = false)
    private int roll;

    @Column(name = "column_count", nullable = false)
    private int column;

    @OneToMany(mappedBy = "hallType", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CinemaHall> cinemaHalls;
}
