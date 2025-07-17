package com.spring.accountservice.service;


import com.spring.accountservice.dto.LoginRequest;
import com.spring.accountservice.dto.RegisterRequest;
import com.spring.accountservice.dto.UserDTO;
import com.spring.accountservice.entity.MemberShip;
import com.spring.accountservice.entity.Users;
import com.spring.accountservice.entity.VerifyToken;
import com.spring.accountservice.payload.ResponseData;
import com.spring.accountservice.repository.*;
import com.spring.accountservice.service.Imp.UserService;
import com.spring.accountservice.utils.JwtTokenHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;


@Service
public class UserServiceImp implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtTokenHelper jwtTokenHelpers;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    TokenRepository tokenRepository;

    @Autowired
    JavaMailSender mailSender;

    @Autowired
    MemberShipRepository memberShipRepository;


    @Autowired
    VerifyTokenRepository verifyTokenRepository;


    @Value("http://34.126.66.29")
    String frontEndUrl;


    private void validateUser(RegisterRequest request) throws Exception {
        if (request.getFullName().trim().isEmpty()) {
            throw new Exception("Username cannot be empty");
        }
        if (request.getPassword().trim().isEmpty()) {
            throw new Exception("Password cannot be empty");
        }
        if (request.getEmail().trim().isEmpty()) {
            throw new Exception("Email cannot be empty");
        }
        if (!request.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new Exception("Invalid email format");
        }
        if (request.getPassword().length() < 8) {
            throw new Exception("Password must be at least 8 characters long");
        }
        if (request.getPhone() != null && !request.getPhone().matches("^\\d{10}$")) {
            throw new Exception("Invalid phone number format");
        }
    }

    @Override
    public ResponseData login(LoginRequest loginRequest) {
        ResponseData data = new ResponseData();

        Users users = userRepository.findByEmail(loginRequest.getEmail());
        if (users == null) {
            data.setDesc("Email không tồn tại.");
            return data;
        }

        if (!users.isEmailVerified()) {
            data.setDesc("Email chưa được xác minh. Vui lòng kiểm tra email để xác minh tài khoản.");
            return data;
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), users.getPassword())) {
            data.setDesc("Mật khẩu không chính xác!");
            return data;
        }

        String jwt = jwtTokenHelpers.generateToken(users);

        data.setData(jwt);
        data.setDesc("Đăng nhập thành công.");
        return data;
    }

    @Override
    public ResponseData register(RegisterRequest registerRequest) throws Exception {

        validateUser(registerRequest);

        Users user = new Users();
        user.setFullName(registerRequest.getFullName());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEmail(registerRequest.getEmail());
        user.setPhoneNumber(registerRequest.getPhone());
        user.setRole(roleRepository.findByNameIgnoreCase("user"));
        user.setRoyalPoint(0);
        user.setCreatedAt(new Date());
        user.setMemberShip(memberShipRepository.findByNameIgnoreCase("UNRANK"));
        user.setActive(true);
        userRepository.save(user);
        ResponseData responseData = new ResponseData();
        responseData.setDesc("Dăng ký thành công, vui lòng kiểm tra email để xác minh tài khoản.");

        // Gửi email xác minh qua mail
        Date expiryDate = Date.from(Instant.now().plus(10, ChronoUnit.MINUTES));

        String otp = String.format("%06d", new Random().nextInt(999999));
        VerifyToken verificationCode = new VerifyToken();
        verificationCode.setToken(otp);
        verificationCode.setUser(user);
        verificationCode.setExpiryDate(expiryDate);
        verifyTokenRepository.save(verificationCode);

        String mailText = String.format("Xin chào %s,\n\nMã xác minh tài khoản của bạn là: %s\nMã có hiệu lực trong 10 phút.", user.getFullName(), otp);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Xác minh đăng ký tài khoản");
        message.setText(mailText);
        mailSender.send(message);


        return responseData;
    }

    @Override
    public void changePassword(int userId, String currentPassword, String newPassword) throws Exception {
        Users user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new Exception("User not found");
        }

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new Exception("Current password is incorrect");
        }

        if (newPassword == null || newPassword.length() < 8) {
            throw new Exception("Password must be at least 8 characters long");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    public void generateResetToken(String email) throws Exception {
        Users user = userRepository.findByEmail(email.trim());
        System.out.println("Email input: [" + email + "]");
        System.out.println("User fetched: " + user);

        if (user == null) {
            throw new Exception("User not found with email: " + email);
        }

        String token = String.format("%06d", new Random().nextInt(999999));
        VerifyToken resetToken = new VerifyToken();

        for (VerifyToken existingToken : tokenRepository.findAll()) {
            Users existingUser = existingToken.getUser();
            if (existingUser != null && existingUser.equals(user)) {
                tokenRepository.delete(existingToken);
            }
        }

        Date expiryDate = Date.from(Instant.now().plus(10, ChronoUnit.MINUTES));

        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(expiryDate);


        tokenRepository.save(resetToken);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Đặt lại mật khẩu");

        String resetUrl = frontEndUrl + "/reset-password";

        String text = String.format("Xin chào %s,\n\n" + "Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.\n" + "Mã đặt lại mật khẩu của bạn là:\n\n%s\n\n" + "Vui lòng nhấn vào đường link bên dưới để tiến hành đặt lại mật khẩu:\n\n%s\n\n" + "Lưu ý: Liên kết này sẽ hết hạn sau 10 phút kể từ thời điểm yêu cầu được gửi.\n\n" + "Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này. Tài khoản của bạn sẽ vẫn được bảo mật.\n\n" + "Trân trọng,\n" + "Đội hỗ trợ hệ thống.", user.getFullName(), token, resetUrl);
        message.setText(text);
        mailSender.send(message);
    }

    @Override
    public void resetPassword(String token, String newPassword) {
        VerifyToken resetToken = tokenRepository.findByToken(token);
        if (resetToken == null) {
            return;
        }
        if (resetToken.getExpiryDate().before(new Date())) {
            tokenRepository.delete(resetToken);
            return;
        }
        Users user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        tokenRepository.delete(resetToken);
    }

    @Override
    public ResponseData getListAccount() {
        ResponseData responseData = new ResponseData();
        try {
            List<Users> users = userRepository.findAll();
            List<UserDTO> result = new ArrayList<>();
            for (Users user : users) {
                UserDTO userDTO = new UserDTO();
                userDTO.setId(user.getId());
                userDTO.setFullName(user.getFullName());
                userDTO.setEmail(user.getEmail());
                userDTO.setPhoneNumber(user.getPhoneNumber());
                userDTO.setRoleName(user.getRole().getName());
                userDTO.setActive(user.isActive());
                result.add(userDTO);
            }
            responseData.setData(result);
            responseData.setDesc("Danh sách tài khoản được lấy thành công.");
            responseData.setStatus(200);
        } catch (Exception e) {
            responseData.setDesc("Có lỗi xảy ra khi lấy danh sách tài khoản.");
            responseData.setStatus(500);
        }
        return responseData;
    }

    @Override
    public void softDeleteAccount(int userId) throws Exception {
        Users user = userRepository.findById(userId).orElse(null);
        System.out.println("User ID: " + userId);
        if (user == null) {
            throw new Exception("User not found");
        }
        if (user.getRole().getName().equalsIgnoreCase("admin")) {
            throw new Exception("Cannot delete admin account");
        }
        if (!user.isActive()) {
            throw new Exception("User account is already deleted");
        }
        user.setActive(false);
        userRepository.save(user);
    }

    @Override
    public void reactivateAccount(int userId) throws Exception {
        Users user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new Exception("User not found");
        }
        if (user.isActive()) {
            throw new Exception("User account is already active");
        }
        user.setActive(true);
        userRepository.save(user);
    }

    @Override
    public void increaseRoyalPoint(int userId, int point) throws Exception {
        Users user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new Exception("User not found");
        }
        if (point <= 0) {
            throw new Exception("Point must be greater than zero");
        }

        int pointAfterUpgrade = user.getRoyalPoint()+ point;

        user.setRoyalPoint(pointAfterUpgrade);

        if(pointAfterUpgrade>=0&&pointAfterUpgrade<=100){
            user.setMemberShip(memberShipRepository.findByNameIgnoreCase("UNRANK"));
        } else if(pointAfterUpgrade>100&&pointAfterUpgrade<=1000){
            user.setMemberShip(memberShipRepository.findByNameIgnoreCase("GOLD"));
        } else{
            user.setMemberShip(memberShipRepository.findByNameIgnoreCase("PLATINUM"));
        }

        userRepository.save(user);
    }

    @Override
    public Map<String, Object> getUserInfo(int userId) {
    Users user = userRepository.findById(userId).orElse(null);
        Map<String, Object> data = new HashMap<>();
    if (user != null) {
        data.put("fullName", user.getFullName());
        data.put("email", user.getEmail());
        data.put("phone", user.getPhoneNumber());
        data.put("royalPoint", user.getRoyalPoint());

    }
        return Map.of();
    }


}
