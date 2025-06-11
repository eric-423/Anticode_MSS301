package mss301.galaxycine.galaxy.cine.userservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "verify_tokens")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class VerifyToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String token;

    @OneToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @Column(name = "expiry_date")
    private Date expiryDate;

    @Column(name = "created_at")
    private Date createdAt;
}