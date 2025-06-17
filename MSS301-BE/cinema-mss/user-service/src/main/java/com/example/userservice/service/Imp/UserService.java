package com.example.userservice.service.Imp;

import com.example.userservice.dto.LoginRequest;
import com.example.userservice.dto.RegisterRequest;
import com.example.userservice.payload.ResponseData;

public interface UserService {
    ResponseData login(LoginRequest loginRequest);

    ResponseData register(RegisterRequest registerRequest) throws Exception;

    void changePassword(int userId, String currentPassword, String newPassword) throws Exception;

    void generateResetToken(String email) throws Exception;

    void resetPassword(String token, String newPassword);

}
