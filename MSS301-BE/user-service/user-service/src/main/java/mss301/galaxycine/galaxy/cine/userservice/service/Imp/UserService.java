package mss301.galaxycine.galaxy.cine.userservice.service.Imp;

import mss301.galaxycine.galaxy.cine.userservice.dto.LoginRequest;
import mss301.galaxycine.galaxy.cine.userservice.dto.RegisterRequest;
import mss301.galaxycine.galaxy.cine.userservice.dto.UserDTO;
import mss301.galaxycine.galaxy.cine.userservice.payload.ResponseData;

public interface UserService {
    ResponseData login(LoginRequest loginRequest);

    ResponseData register(RegisterRequest registerRequest) throws Exception;

    void changePassword(int userId, String currentPassword, String newPassword) throws Exception;

    void generateResetToken(String email) throws Exception;

    void resetPassword(String token, String newPassword);

    UserDTO getUserById();

    UserDTO updateUserById(UserDTO userDTO) throws Exception;

}
