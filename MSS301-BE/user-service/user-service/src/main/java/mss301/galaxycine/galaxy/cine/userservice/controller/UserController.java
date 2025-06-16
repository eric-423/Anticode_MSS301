package mss301.galaxycine.galaxy.cine.userservice.controller;


import mss301.galaxycine.galaxy.cine.userservice.dto.*;
import mss301.galaxycine.galaxy.cine.userservice.entity.Users;
import mss301.galaxycine.galaxy.cine.userservice.entity.VerifyToken;
import mss301.galaxycine.galaxy.cine.userservice.payload.ResponseData;
import mss301.galaxycine.galaxy.cine.userservice.repository.UserRepository;
import mss301.galaxycine.galaxy.cine.userservice.repository.VerifyTokenRepository;
import mss301.galaxycine.galaxy.cine.userservice.service.Imp.UserService;
import mss301.galaxycine.galaxy.cine.userservice.utils.JwtTokenHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @GetMapping("me")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN','MANAGER')")
    public ResponseEntity<?> getCurrentUser() {
        ResponseData data = new ResponseData();
        data.setData(userService.getUserById());
        data.setDesc("get user by id success");
        if (userService.getUserById() == null) {
            data.setStatus(404);
            return new ResponseEntity<>(data, HttpStatus.NOT_FOUND);
        } else {
            data.setStatus(200);
        }

        return new ResponseEntity<>(data, HttpStatus.OK);
    }


    @PutMapping("me")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN','MANAGER')")
    public ResponseEntity<?> updateUser(@RequestBody UserDTO userDTO) {
        ResponseData data = new ResponseData();
        try {
            UserDTO updatedUser = userService.updateUserById(userDTO);
            data.setData(updatedUser);
            data.setDesc("Update user by id success");
            data.setStatus(200);
        } catch (Exception e) {
            data.setDesc(e.getMessage());
            data.setStatus(400);
            return new ResponseEntity<>(data, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
}
