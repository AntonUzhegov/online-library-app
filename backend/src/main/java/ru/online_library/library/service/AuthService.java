package ru.online_library.library.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.online_library.library.exception.UnauthorizedException;
import ru.online_library.library.model.Role;
import ru.online_library.library.model.User;
import ru.online_library.library.repository.UserRepository;
import ru.online_library.library.security.JwtUtils;
import ru.online_library.library.security.UserDetailsImpl;

import java.time.LocalDateTime;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtils jwtUtils,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
    }

    public User register(String username, String email, String password,
                         String firstName, String lastName) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Логин уже занят");
        }

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email уже занят");
        }

        User user = new User(username, email, passwordEncoder.encode(password));
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setRole(Role.ROLE_USER);
        user.setRegistrationDate(LocalDateTime.now());
        user.setActive(true);

        return userRepository.save(user);
    }

    public String authenticate(String username, String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return jwtUtils.generateJwtToken(authentication);
        } catch (AuthenticationException e) {
            throw new UnauthorizedException("Неверный логин или пароль");
        }
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Пользователь не авторизован");
        }

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
    }
}