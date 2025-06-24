package com.spring.accountservice.controller;


import com.spring.accountservice.dto.*;
import com.spring.accountservice.entity.Users;
import com.spring.accountservice.entity.VerifyToken;
import com.spring.accountservice.repository.UserRepository;
import com.spring.accountservice.repository.VerifyTokenRepository;
import com.spring.accountservice.service.Imp.UserService;
import com.spring.accountservice.utils.JwtTokenHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @Autowired
    VerifyTokenRepository verifyTokenRepository;

    @Autowired
    UserRepository userRepository;


    @GetMapping("/validate")
    public ResponseEntity<Void> validateToken(@RequestParam("token") String token) {
        try {
            jwtTokenHelper.verifyToken(token);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            return new ResponseEntity<>(userService.login(loginRequest), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("Login Fail", HttpStatus.BAD_REQUEST);
    }


    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logged out successfully");
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            return new ResponseEntity<>(userService.register(request), HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCode(@RequestBody VerifyCodeRequest request) {
        VerifyToken code = verifyTokenRepository.findByToken(request.getToken());
        if (code == null || code.getExpiryDate().before(new Date())) {
            return ResponseEntity.badRequest().body("Mã không hợp lệ hoặc đã hết hạn.");
        }

        Users user = code.getUser();
        user.setEmailVerified(true);
        userRepository.save(user);
        verifyTokenRepository.delete(code);

        return ResponseEntity.ok("Xác minh thành công. Tài khoản đã được kích hoạt.");
    }


    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest req) throws Exception {
        int userId = jwtTokenHelper.getUserIdFromToken();
        userService.changePassword(userId, req.getCurrentPassword(), req.getNewPassword());
        return ResponseEntity.ok("Password updated");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody EmailRequest request) {
        try {
            userService.generateResetToken(request.getEmail());
            return ResponseEntity.ok("Reset email sent");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        userService.resetPassword(request.getToken(), request.getNewPassword());
        return ResponseEntity.ok("Password reset successfully");
    }


}
