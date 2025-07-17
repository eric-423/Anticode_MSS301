package com.spring.accountservice.service.Imp;


import com.spring.accountservice.dto.LoginRequest;
import com.spring.accountservice.dto.RegisterRequest;
import com.spring.accountservice.payload.ResponseData;

import java.util.Map;

public interface UserService {
    ResponseData login(LoginRequest loginRequest);

    ResponseData register(RegisterRequest registerRequest) throws Exception;

    void changePassword(int userId, String currentPassword, String newPassword) throws Exception;

    void generateResetToken(String email) throws Exception;

    void resetPassword(String token, String newPassword);

    ResponseData getListAccount();

    void softDeleteAccount(int userId) throws Exception;

    void reactivateAccount(int userId) throws Exception;

    void increaseRoyalPoint(int userId, int point) throws Exception;

    Map<String, Object> getUserInfo(int userId);
}
