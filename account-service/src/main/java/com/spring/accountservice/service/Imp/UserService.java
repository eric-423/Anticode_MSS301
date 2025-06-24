package com.spring.accountservice.service.Imp;


import com.spring.accountservice.dto.LoginRequest;
import com.spring.accountservice.dto.RegisterRequest;
import com.spring.accountservice.payload.ResponseData;

public interface UserService {
    ResponseData login(LoginRequest loginRequest);

    ResponseData register(RegisterRequest registerRequest) throws Exception;

    void changePassword(int userId, String currentPassword, String newPassword) throws Exception;

    void generateResetToken(String email) throws Exception;

    void resetPassword(String token, String newPassword);

}
