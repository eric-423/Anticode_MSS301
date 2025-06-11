package mss301.galaxycine.galaxy.cine.userservice.service;

import mss301.galaxycine.galaxy.cine.userservice.dto.LoginRequest;
import mss301.galaxycine.galaxy.cine.userservice.dto.RegisterRequest;
import mss301.galaxycine.galaxy.cine.userservice.entity.PasswordResetToken;
import mss301.galaxycine.galaxy.cine.userservice.entity.Users;
import mss301.galaxycine.galaxy.cine.userservice.payload.ResponseData;
import mss301.galaxycine.galaxy.cine.userservice.repository.RoleRepository;
import mss301.galaxycine.galaxy.cine.userservice.repository.TokenRepository;
import mss301.galaxycine.galaxy.cine.userservice.repository.UserRepository;
import mss301.galaxycine.galaxy.cine.userservice.service.Imp.UserService;
import mss301.galaxycine.galaxy.cine.userservice.utils.JwtTokenHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.UUID;


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

    @Value("http://localhost:5173")
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
        String jwt;
        Users users = userRepository.findByEmail(loginRequest.getEmail());
        if (users != null) {
            jwt = jwtTokenHelpers.generateToken(users);
            ResponseData data = new ResponseData();
            data.setData(jwt);
            return data;
        }
        return null;
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
        user.setCreatedAt(new Date(System.currentTimeMillis()));
        userRepository.save(user);
        ResponseData responseData = new ResponseData();
        responseData.setDesc("User registered successfully");
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

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();

        for (PasswordResetToken existingToken : tokenRepository.findAll()) {
            Users existingUser = existingToken.getUser();
            if (existingUser != null && existingUser.equals(user)) {
                tokenRepository.delete(existingToken);
            }
        }

        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(new java.util.Date(System.currentTimeMillis() + 600_000));
        tokenRepository.save(resetToken);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Password Reset");

        String resetUrl = frontEndUrl + "/reset-password";

        String text = String.format("Hello %s,\n\n" + "We have received a request to reset the password for your account.\n" + "Your password reset token is:\n\n%s\n\n" + "Please click the link below to proceed with resetting your password:\n\n%s\n\n" + "Note: This link will expire 10 minute from the time the request was made.\n\n" + "If you did not request this, please ignore this email. Your account will remain secure.\n\n" + "Best regards,\n" + "System Support Team.", user.getFullName(), token, resetUrl);

        message.setText(text);
        mailSender.send(message);
    }

    @Override
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token);
        if (resetToken == null) {
            return;
        }
        if (resetToken.getExpiryDate().before(new java.util.Date())) {
            tokenRepository.delete(resetToken);
            return;
        }
        Users user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        tokenRepository.delete(resetToken);
    }
}
