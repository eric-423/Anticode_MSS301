package mss301.galaxycine.galaxy.cine.userservice.config;

import mss301.galaxycine.galaxy.cine.userservice.entity.Users;
import mss301.galaxycine.galaxy.cine.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class UserDetailService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users users = userRepository.findByEmail(email);
        if (users == null) {
            throw new UsernameNotFoundException("User can's exits");
        } else {
            return new User(email, users.getPassword(), new ArrayList<>());
        }
    }
}
