package ru.online_library.library.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.online_library.library.model.Role;
import ru.online_library.library.model.User;
import ru.online_library.library.repository.UserRepository;

import java.time.LocalDateTime;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(String username, String email, String password, String firstName, String lastName){
        if(userRepository.existsByUsername(username)){
            throw new RuntimeException("Логин уже занят");
        }

        if(userRepository.existsByEmail(email)){
            throw new RuntimeException("Email уже занят");
        }

        User user = new User(username, email, passwordEncoder.encode(password));
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setRole(Role.USER);
        user.setRegistrationDate(LocalDateTime.now());
        user.setActive(true);

        return userRepository.save(user);
    }

    public User login(String username, String password){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));

        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new RuntimeException("Неверный пароль");
        }

        if(!user.isActive()){
            throw new RuntimeException("Аккаунт заблокирован");
        }

        return user;
    }
}