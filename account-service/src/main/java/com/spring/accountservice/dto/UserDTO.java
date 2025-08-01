package com.spring.accountservice.dto;

import lombok.Data;

@Data
public class UserDTO {
    private int id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String roleName;
    private boolean isActive = true;
    private int royalPoint;
}
