package mss301.galaxycine.galaxy.cine.userservice.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class UserDTO {

    private int id;

    private String fullName;

    private String email;

    private String phoneNumber;

    private String password;

    private int royalPoint;

    private Date dateOfBirth;

    private Date createdAt;

    private String memberShip;

}
