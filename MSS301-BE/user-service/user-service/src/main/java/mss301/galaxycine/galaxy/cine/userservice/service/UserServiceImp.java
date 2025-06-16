package mss301.galaxycine.galaxy.cine.userservice.service;

import mss301.galaxycine.galaxy.cine.userservice.dto.LoginRequest;
import mss301.galaxycine.galaxy.cine.userservice.dto.RegisterRequest;
import mss301.galaxycine.galaxy.cine.userservice.dto.UserDTO;
import mss301.galaxycine.galaxy.cine.userservice.entity.VerifyToken;
import mss301.galaxycine.galaxy.cine.userservice.entity.Users;
import mss301.galaxycine.galaxy.cine.userservice.payload.ResponseData;
import mss301.galaxycine.galaxy.cine.userservice.repository.*;
import mss301.galaxycine.galaxy.cine.userservice.service.Imp.UserService;
import mss301.galaxycine.galaxy.cine.userservice.utils.JwtTokenHelper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Random;
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


    @Autowired
    VerifyTokenRepository verifyTokenRepository;

    @Autowired
    private MemberShipRepository memberShipRepository;

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
        if (!users.isEmailVerified()) {
            ResponseData data = new ResponseData();
            data.setDesc("Email chưa được xác minh. Vui lòng kiểm tra email để xác minh tài khoản.");
            return data;
        }
        jwt = jwtTokenHelpers.generateToken(users);
        ResponseData data = new ResponseData();
        data.setData(jwt);
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
        user.setMemberShip(memberShipRepository.findByNameIgnoreCase("vip"));
        user.setRoyalPoint(0);
        user.setCreatedAt(new Date());
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

        String token = UUID.randomUUID().toString();
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
        if (resetToken.getExpiryDate().before(new java.util.Date())) {
            tokenRepository.delete(resetToken);
            return;
        }
        Users user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        tokenRepository.delete(resetToken);
    }


    @Override
    public UserDTO getUserById() {
        int userId = jwtTokenHelpers.getUserIdFromToken();
        UserDTO dto = new UserDTO();
        try {
            Users user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));
            BeanUtils.copyProperties(user, dto);
            dto.setMemberShip(user.getMemberShip().getName());

        } catch (Exception e) {
            e.printStackTrace();
        }

        return dto;
    }


    @Override
    public UserDTO updateUserById(UserDTO userDTO) throws Exception {
        int userId = jwtTokenHelpers.getUserIdFromToken();
        Users user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));

        if (userDTO.getFullName() != null && !userDTO.getFullName().trim().isEmpty()) {
            user.setFullName(userDTO.getFullName());
        }
        if (userDTO.getEmail() != null && !userDTO.getEmail().trim().isEmpty()) {
            user.setEmail(userDTO.getEmail());
        }
        if (userDTO.getPhoneNumber() != null && !userDTO.getPhoneNumber().trim().isEmpty()) {
            user.setPhoneNumber(userDTO.getPhoneNumber());
        }
        if (userDTO.getDateOfBirth() != null) {
            user.setDateOfBirth(userDTO.getDateOfBirth());
        }

        userRepository.save(user);

        userDTO.setMemberShip(user.getMemberShip().getName());

        return userDTO;
    }
}
